import React, {
    Dispatch,
    FormEvent,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { Label } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { LoadingButton } from '@atlaskit/button';
import { destinyClient } from '../../clients/DestinyClient';
import SectionMessage from '@atlaskit/section-message';
import { Platform } from '../../destiny-types/GeneralTypes';
import PlatformSelect from './PlatformSelect';

interface UserSelectionProps {
    setMembershipId: Dispatch<SetStateAction<string | undefined>>;
    setPlatform: Dispatch<SetStateAction<Platform>>;
}

const UserSelection: React.FC<UserSelectionProps> = ({
    setMembershipId,
    setPlatform,
}) => {
    const [name, setName] = useState<string>('');
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
        Platform.PLAYSTATION,
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchedName, setSearchedName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setName(sessionStorage.getItem('userName') || '');
    }, []);

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    const onClick = useCallback(() => {
        setIsLoading(true);
        const nameToSearch = name.trim();
        destinyClient
            .getMembershipId(nameToSearch, selectedPlatform)
            .then((membershipId) => {
                sessionStorage.setItem('userName', nameToSearch);
                sessionStorage.setItem('membershipId', membershipId);
                sessionStorage.setItem('platform', String(selectedPlatform));
                setMembershipId(membershipId);
                setPlatform(selectedPlatform);
                setError(false);
            })
            .catch(() => {
                sessionStorage.removeItem('userName');
                sessionStorage.removeItem('membershipId');
                sessionStorage.removeItem('platform');
                setMembershipId(undefined);
                setPlatform(undefined);
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
                setSearchedName(nameToSearch);
            });
    }, [name, selectedPlatform, setMembershipId, setPlatform]);

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },
        input: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            maxWidth: '400px',
            width: '100%',
        },
        button: {
            marginBottom: '1px',
            marginLeft: 'auto',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.input}>
                <PlatformSelect setSelectedPlatform={setSelectedPlatform} />
                <div>
                    <Label htmlFor="name-input">User Name</Label>
                    <Textfield
                        id="name-input"
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <LoadingButton
                    style={styles.button}
                    appearance="primary"
                    isLoading={isLoading}
                    onClick={onClick}
                >
                    Search
                </LoadingButton>
            </div>
            {error && (
                <SectionMessage title="Error" appearance="error">
                    Could not find user with name '{searchedName}'.
                </SectionMessage>
            )}
        </div>
    );
};

export default UserSelection;
