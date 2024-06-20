import React from 'react';
import RefreshButton from './RefreshButton';

interface PanelTitleProps {
    title: string;
    isRefreshing: boolean;
    refreshFunc: () => void;
}

const PanelTitle: React.FC<PanelTitleProps> = ({
    title,
    isRefreshing,
    refreshFunc,
}) => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
    };

    return (
        <div style={styles.container}>
            <h2>{title}</h2>
            <RefreshButton
                isRefreshing={isRefreshing}
                refreshFunc={refreshFunc}
            />
        </div>
    );
};

export default PanelTitle;
