import React, { useEffect, useState } from 'react';
import GrimoirePanel from './components/grimoire-tracker/GrimoirePanel';
import UserSelection from './components/user-selection/UserSelection';
import { Platform } from './destiny-types/GeneralTypes';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import { Theme } from './destiny-types/DefinitionTypes';
import { destinyClient } from './clients/DestinyClient';
import FragmentPanel from './components/fragment-tracker/FragmentPanel';
import { makeStyles } from '@material-ui/core';

const App: React.FC = () => {
    const [membershipId, setMembershipId] = useState<string>();
    const [platform, setPlatform] = useState<Platform>();
    const [definitions, setDefinitions] = useState<Theme[]>();
    const [areDefinitionsLoading, setAreDefinitionsLoading] =
        useState<boolean>(false);

    useEffect(() => {
        setMembershipId(sessionStorage.getItem('membershipId') || undefined);
        setPlatform(
            (JSON.parse(sessionStorage.getItem('platform')) as Platform) ||
                undefined,
        );
    }, []);

    useEffect(() => {
        setAreDefinitionsLoading(true);
        destinyClient
            .getGrimoireDefinitions()
            .then(setDefinitions)
            .catch(console.error)
            .finally(() => setAreDefinitionsLoading(false));
    }, []);

    const useStyles = makeStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            fontSize: '16px',
            color: '#172b4d',
            fontFamily:
                '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            '& .css-74z8cf-Text': {
                fontSize: '14px',
            },
        },
    });

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <h1>Destiny Tracker</h1>
            <UserSelection
                setMembershipId={setMembershipId}
                setPlatform={setPlatform}
            />
            <Tabs id="trackers" shouldUnmountTabPanelOnChange>
                <TabList>
                    <Tab>Grimoire Points</Tab>
                    <Tab>Calcified Fragments</Tab>
                </TabList>
                <TabPanel>
                    <GrimoirePanel
                        membershipId={membershipId}
                        platform={platform}
                        definitions={definitions}
                        areDefinitionsLoading={areDefinitionsLoading}
                    />
                </TabPanel>
                <TabPanel>
                    <FragmentPanel
                        membershipId={membershipId}
                        platform={platform}
                        definitions={definitions}
                        areDefinitionsLoading={areDefinitionsLoading}
                    />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default App;
