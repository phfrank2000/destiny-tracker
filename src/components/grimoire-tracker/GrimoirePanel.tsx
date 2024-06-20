import React, { useCallback, useEffect, useState } from 'react';
import { GrimoireStatus } from '../../destiny-types/GrimoireTypes';
import { Theme } from '../../destiny-types/DefinitionTypes';
import { Platform } from '../../destiny-types/GeneralTypes';
import { destinyClient } from '../../clients/DestinyClient';
import { Grimoire } from '../../Types';
import { grimoireMapper } from '../../services/GrimoireMapper';
import PanelTitle from '../general/PanelTitle';
import GrimoireList from './GrimoireList';

interface GrimoirePanelProps {
    membershipId?: string;
    platform?: Platform;
    definitions?: Theme[];
    areDefinitionsLoading: boolean;
}

const GrimoirePanel: React.FC<GrimoirePanelProps> = ({
    membershipId,
    platform,
    definitions,
    areDefinitionsLoading,
}) => {
    const [status, setStatus] = useState<GrimoireStatus>();
    const [grimoires, setGrimoires] = useState<Grimoire[]>([]);
    const [isStatusLoading, setIsStatusLoading] = useState<boolean>(false);
    const [isMapping, setIsMapping] = useState<boolean>(false);

    const fetchGrimoireStatus = useCallback(() => {
        if (membershipId && platform) {
            setIsStatusLoading(true);
            destinyClient
                .getGrimoireStatus(membershipId, platform)
                .then(setStatus)
                .catch(console.error)
                .finally(() => setIsStatusLoading(false));
        } else {
            setStatus(undefined);
        }
    }, [membershipId, platform]);

    useEffect(() => {
        fetchGrimoireStatus();
    }, [fetchGrimoireStatus]);

    useEffect(() => {
        if (status && definitions) {
            setIsMapping(true);
            setGrimoires(
                grimoireMapper.mapToGrimoires(
                    status.cardCollection,
                    definitions.flatMap((definition) =>
                        definition.pageCollection.flatMap(
                            (page) => page.cardCollection,
                        ),
                    ),
                ),
            );
        } else {
            setGrimoires([]);
        }
    }, [definitions, status]);

    useEffect(() => {
        if (isMapping) {
            setIsMapping(false);
        }
    }, [grimoires, isMapping]);

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '100%',
        },
    };

    return (
        <div style={styles.container}>
            <PanelTitle
                title="Grimoire Points"
                isRefreshing={isStatusLoading || isMapping}
                refreshFunc={fetchGrimoireStatus}
            />
            <div>Acquired Points: {status?.score}</div>
            <GrimoireList
                grimoires={grimoires}
                isLoading={
                    isStatusLoading || areDefinitionsLoading || isMapping
                }
            />
        </div>
    );
};

export default GrimoirePanel;
