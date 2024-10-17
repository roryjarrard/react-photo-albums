import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import useThunk from '../hooks/use-thunk';

const UsersListItem = ({ user }) => {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user);
    };

    return (
        <div className="border rounded p-4 mb-2">
            <div className="flex p-2 justify-between items-center cursor-pointer">
                <div className="flex flex-row items-center justify-between">
                    <Button className="mr-3" loading={isLoading} onClick={handleClick}>
                        <GoTrashcan />
                    </Button>
                    {error && <div>Error removing user...</div>}
                    {user.name}
                </div>
            </div>
        </div>
    );
};

export default UsersListItem;