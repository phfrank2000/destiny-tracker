import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Platform } from '../../destiny-types/GeneralTypes';
import { Label } from '@atlaskit/form';
import Select from '@atlaskit/select';
import { PlatformSelectOption } from '../../Types';

interface PlatformSelectProps {
    setSelectedPlatform: Dispatch<SetStateAction<Platform>>;
}

const PlatformSelect: React.FC<PlatformSelectProps> = ({
    setSelectedPlatform,
}) => {
    const options = useMemo<PlatformSelectOption[]>(
        () => [
            { label: 'Xbox', value: Platform.XBOX },
            { label: 'Playstation', value: Platform.PLAYSTATION },
        ],
        [],
    );

    const [value, setValue] = useState<PlatformSelectOption>(options[1]);

    useEffect(() => {
        const platform = JSON.parse(
            sessionStorage.getItem('platform'),
        ) as Platform;
        setValue(options[platform ? platform - 1 : 1]);
    }, [options]);

    const onChange = (newValue: PlatformSelectOption) => {
        setValue(newValue);
        setSelectedPlatform(newValue.value);
    };

    return (
        <div>
            <Label htmlFor="platform-select">User Name</Label>
            <Select
                id="platform-select"
                options={options}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default PlatformSelect;
