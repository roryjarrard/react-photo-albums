import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import SkeletonLoader from './SkeletonLoader';

const UsersList = () => {
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setLoadingUsersError] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [creatingUserError, setCreatingUserError] = useState(null);


    const dispatch = useDispatch();

    const { data } = useSelector((state) => state.users);

    useEffect(() => {
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            .unwrap()
            .catch((err) => setLoadingUsersError(err))
            .finally(() => setIsLoadingUsers(false));
    }, [dispatch]);

    const handleUserAdd = () => {
        setIsCreatingUser(true);
        dispatch(addUser())
            .unwrap()
            .catch((err) => setCreatingUserError(err))
            .finally(() => setIsCreatingUser(false));
    };

    if (isLoadingUsers) {
        return <SkeletonLoader times={6} className="h-10 w-full" />;
    }

    if (loadingUsersError) {
        return <div>Error fetching data...</div>;
    }

    const renderedUsers = data.map((user) => (
        <div key={user.id} className="border rounded p-4 mb-2">
            <div className="flex p-2 justify-between items-center cursor-pointer">
                {user.name}
            </div>
        </div>
    ));



    return (<div>
        <div className="flex flex-row justify-between m-3">
            <h1 className="m-2 text-xl">Users</h1>
            {
                isCreatingUser
                    ? 'is creating user...'
                    : <Button onClick={handleUserAdd}>+ Add User</Button>
            }
            {
                creatingUserError && <div>Error creating user...</div>
            }
        </div>
        {renderedUsers}
    </div>
    );
};

export default UsersList;