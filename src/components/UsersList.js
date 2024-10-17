import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import UsersListItem from './UsersListItem';
import Button from './Button';
import SkeletonLoader from './SkeletonLoader';

import useThunk from '../hooks/use-thunk';

const UsersList = () => {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);


    const { data } = useSelector((state) => state.users);

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    };

    let content = null;
    if (isLoadingUsers) {
        content =  <SkeletonLoader times={6} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content =  <div>Error fetching data...</div>;
    } else {
        content = data.map((user) => (
            <UsersListItem key={user.id} user={user} />
        ));
    } 

    return (<div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            <Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
            {
                creatingUserError && <div>Error creating user...</div>
            }
        </div>
        {content}
    </div>
    );
};

export default UsersList;