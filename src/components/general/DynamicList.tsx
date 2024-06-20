import React, { useEffect, useState } from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import { makeStyles } from '@material-ui/core';
import {
    HeadType,
    RowType,
    SortOrderType,
} from '@atlaskit/dynamic-table/types';
import { SortEvent } from '../../Types';

interface DynamicListProps {
    identifier: string;
    tableHead: HeadType;
    tableRows: RowType[];
    isLoading: boolean;
}

const DynamicList: React.FC<DynamicListProps> = ({
    identifier,
    tableHead,
    tableRows,
    isLoading,
}) => {
    const [sortKey, setSortKey] = useState<string>();
    const [sortOrder, setSortOrder] = useState<SortOrderType>();

    useEffect(() => {
        setSortKey(sessionStorage.getItem(`${identifier}SortKey`));
        setSortOrder(
            sessionStorage.getItem(`${identifier}SortOrder`) as SortOrderType,
        );
    }, [identifier]);

    const onSort = (event: SortEvent) => {
        sessionStorage.setItem(`${identifier}SortKey`, event.key);
        sessionStorage.setItem(`${identifier}SortOrder`, event.sortOrder);
    };

    const useStyles = makeStyles({
        container: {
            '& .css-1wodie7:not(:last-child) .css-vej7ik': {
                borderBottom: '1px solid #dfe1e6',
            },
        },
    });

    const classes = useStyles();

    return (
        <div className={classes.container}>
            {sortKey !== undefined && sortOrder !== undefined && (
                <DynamicTable
                    head={tableHead}
                    rows={tableRows}
                    emptyView={<h3>No User is specified</h3>}
                    isLoading={isLoading}
                    onSort={onSort}
                    defaultSortKey={sortKey}
                    defaultSortOrder={sortOrder}
                />
            )}
        </div>
    );
};

export default DynamicList;
