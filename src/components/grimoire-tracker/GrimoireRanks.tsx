import React from 'react';
import { GrimoireRank } from '../../Types';
import StatusIcon from './StatusIcon';
import { v4 } from 'uuid';

interface GrimoireRanksProps {
    ranks: GrimoireRank[];
}

const GrimoireRanks: React.FC<GrimoireRanksProps> = ({ ranks }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
        },
        rank: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
    };

    return (
        <div style={styles.container}>
            {ranks.map((rank) => (
                <div key={v4()} style={styles.rank}>
                    <StatusIcon isSuccess={rank.isReached} />
                    Rank {rank.rank} - {rank.threshold}
                </div>
            ))}
        </div>
    );
};

export default GrimoireRanks;
