import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from '../../destiny-types/GeneralTypes';
import { Theme } from '../../destiny-types/DefinitionTypes';
import { Summary } from '../../destiny-types/SummaryTypes';
import { destinyClient } from '../../clients/DestinyClient';
import FragmentList from './FragmentList';
import { CharacterChecklist, Fragment } from '../../Types';
import { fragmentMapper } from '../../services/FragmentMapper';
import PanelTitle from '../general/PanelTitle';

interface FragmentPanelProps {
    membershipId?: string;
    platform?: Platform;
    definitions?: Theme[];
    areDefinitionsLoading: boolean;
}

const FragmentPanel: React.FC<FragmentPanelProps> = ({
    membershipId,
    platform,
    definitions,
    areDefinitionsLoading,
}) => {
    const [summary, setSummary] = useState<Summary>();
    const [checklists, setChecklists] = useState<CharacterChecklist[]>();
    const [fragments, setFragments] = useState<Fragment[]>([]);
    const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
    const [areChecklistsLoading, setAreChecklistsLoading] =
        useState<boolean>(false);
    const [isMapping, setIsMapping] = useState<boolean>(false);

    useEffect(() => {
        if (membershipId && platform) {
            setIsSummaryLoading(true);
            destinyClient
                .getSummary(membershipId, platform)
                .then(setSummary)
                .catch(console.error)
                .finally(() => setIsSummaryLoading(false));
        } else {
            setSummary(undefined);
        }
    }, [membershipId, platform]);

    const fetchChecklists = useCallback(() => {
        if (summary && membershipId && platform) {
            setAreChecklistsLoading(true);
            Promise.all(
                summary.characters.map((character) =>
                    destinyClient.getCharacterFragmentChecklist(
                        membershipId,
                        platform,
                        character.characterBase.characterId,
                    ),
                ),
            )
                .then((fetchedLists) => {
                    const newChecklists =
                        fragmentMapper.mapToCharacterChecklists(
                            summary,
                            fetchedLists,
                        );
                    setChecklists(newChecklists);
                })
                .catch(console.error)
                .finally(() => setAreChecklistsLoading(false));
        }
    }, [membershipId, platform, summary]);

    useEffect(() => {
        fetchChecklists();
    }, [fetchChecklists]);

    useEffect(() => {
        if (checklists && definitions) {
            setIsMapping(true);
            setFragments(
                fragmentMapper.mapToFragments(
                    checklists,
                    definitions.flatMap((definition) =>
                        definition.pageCollection.flatMap(
                            (page) => page.cardCollection,
                        ),
                    ),
                ),
            );
        } else {
            setFragments([]);
        }
    }, [checklists, definitions]);

    useEffect(() => {
        if (isMapping) {
            setIsMapping(false);
        }
    }, [fragments, isMapping]);

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
                title="Calcified Fragments"
                isRefreshing={areChecklistsLoading || isMapping}
                refreshFunc={fetchChecklists}
            />
            <div>
                Acquired Fragments:{' '}
                {checklists &&
                    `${Math.max(...checklists.map((list) => list.acquired))}/50`}
            </div>
            <FragmentList
                fragments={fragments}
                isLoading={
                    isSummaryLoading ||
                    areChecklistsLoading ||
                    areDefinitionsLoading ||
                    isMapping
                }
            />
        </div>
    );
};

export default FragmentPanel;
