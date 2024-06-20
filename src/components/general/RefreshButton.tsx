import React, { CSSProperties } from 'react';
import RefreshIcon from '@atlaskit/icon/glyph/refresh';
import Button from '@atlaskit/button';

interface RefreshButtonProps {
    isRefreshing: boolean;
    refreshFunc: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
    isRefreshing,
    refreshFunc,
}) => {
    const styles: { [key: string]: CSSProperties } = {
        button: {
            marginBottom: '0.85em',
        },
        spinning: {
            animation: isRefreshing ? 'spin 2s linear infinite' : 'none',
        },
    };

    return (
        <Button
            style={styles.button}
            appearance="subtle-link"
            iconBefore={
                <div style={styles.spinning}>
                    <RefreshIcon label="" />
                </div>
            }
            onClick={() => refreshFunc()}
        ></Button>
    );
};

export default RefreshButton;
