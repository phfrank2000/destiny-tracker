import React, { useEffect, useState } from 'react';
import { HeadType, RowType } from '@atlaskit/dynamic-table/types';
import { decode } from 'he';
import { Fragment } from '../../Types';
import DynamicList from '../general/DynamicList';
import Emblems from './Emblems';

interface FragmentListProps {
    fragments: Fragment[];
    isLoading: boolean;
}

const FragmentList: React.FC<FragmentListProps> = ({
    fragments,
    isLoading,
}) => {
    const [tableRows, setTableRows] = useState<RowType[]>([]);

    useEffect(() => {
        const existingTableRows: RowType[] = fragments.map((fragment) => ({
            cells: [
                {
                    content: decode(fragment.name),
                },
                {
                    content: <Emblems emblemPaths={fragment.emblemPaths} />,
                },
                {
                    content: fragment.description,
                },
            ],
        }));
        setTableRows(existingTableRows);
    }, [fragments]);

    const tableHead: HeadType = {
        cells: [
            {
                key: 'name',
                content: 'Name',
            },
            {
                key: 'characters',
                content: 'Characters',
            },
            {
                key: 'description',
                content: 'Description',
            },
        ],
    };

    return (
        <DynamicList
            identifier="fragment"
            tableHead={tableHead}
            tableRows={tableRows}
            isLoading={isLoading}
        />
    );
};

export default FragmentList;
