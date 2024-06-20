import React from 'react';
import Image from '@atlaskit/image';
import { v4 } from 'uuid';

interface EmblemsProps {
    emblemPaths: string[];
}

const Emblems: React.FC<EmblemsProps> = ({ emblemPaths }) => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            height: '40px',
            width: '120px',
        },
    };

    return (
        <div style={styles.container}>
            {emblemPaths.map((emblemPath) => (
                <Image key={v4()} src={emblemPath} width={40} />
            ))}
        </div>
    );
};

export default Emblems;
