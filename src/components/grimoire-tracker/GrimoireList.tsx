import React, { useEffect, useState } from 'react';
import { HeadType, RowType } from '@atlaskit/dynamic-table/types';
import { Grimoire } from '../../Types';
import StatusIcon from './StatusIcon';
import { decode } from 'he';
import GrimoireStats from './GrimoireStats';
import DynamicList from '../general/DynamicList';

interface ProgressListProps {
    grimoires: Grimoire[];
    isLoading: boolean;
}

const GrimoireList: React.FC<ProgressListProps> = ({
    grimoires,
    isLoading,
}) => {
    const [tableRows, setTableRows] = useState<RowType[]>([]);

    useEffect(() => {
        const existingTableRows: RowType[] = grimoires.map((grimoire) => ({
            cells: [
                {
                    key: Number(grimoire.isFinished),
                    content: (
                        <StatusIcon
                            isSuccess={grimoire.isFinished}
                            size="xlarge"
                        />
                    ),
                },
                {
                    content: decode(grimoire.name),
                },
                {
                    key: grimoire.points,
                    content: grimoire.points,
                },
                {
                    content: grimoire.score,
                },
                {
                    content: grimoire.statisticCollection && (
                        <GrimoireStats
                            statistics={grimoire.statisticCollection}
                        />
                    ),
                },
            ],
        }));
        setTableRows(existingTableRows);
    }, [grimoires]);

    const tableHead: HeadType = {
        cells: [
            {
                key: 'finished',
                content: 'Finished',
                isSortable: true,
            },
            {
                key: 'name',
                content: 'Name',
            },
            {
                key: 'points',
                content: 'Points',
                isSortable: true,
            },
            {
                key: 'score',
                content: 'Score',
            },
            {
                key: 'stats',
                content: 'Stats',
            },
        ],
    };

    return (
        <DynamicList
            identifier="grimoire"
            tableHead={tableHead}
            tableRows={tableRows}
            isLoading={isLoading}
        />
    );
};

export default GrimoireList;
