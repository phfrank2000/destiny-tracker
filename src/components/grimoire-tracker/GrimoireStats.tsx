import React from 'react';
import { GrimoireStatistic } from '../../Types';
import GrimoireRanks from './GrimoireRanks';
import { v4 } from 'uuid';

interface GrimoireStatsProps {
    statistics: GrimoireStatistic[];
}

const GrimoireStats: React.FC<GrimoireStatsProps> = ({ statistics }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },
        statistic: {
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
        },
    };

    return (
        <div style={styles.container}>
            {statistics.map((statistic) => (
                <div key={v4()} style={styles.statistic}>
                    <strong>{statistic.statName}</strong>
                    <div>Current: {statistic.value}</div>
                    <GrimoireRanks ranks={statistic.rankCollection} />
                </div>
            ))}
        </div>
    );
};

export default GrimoireStats;
