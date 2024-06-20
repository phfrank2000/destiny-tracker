import React from 'react';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { G300, R400 } from '@atlaskit/theme/colors';
import ErrorIcon from '@atlaskit/icon/glyph/error';

interface StatusIconProps {
    isSuccess: boolean;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
}

const StatusIcon: React.FC<StatusIconProps> = ({
    isSuccess,
    size = 'medium',
}) => {
    return isSuccess ? (
        <SuccessIcon size={size} label="" primaryColor={G300} />
    ) : (
        <ErrorIcon size={size} label="" primaryColor={R400} />
    );
};

export default StatusIcon;
