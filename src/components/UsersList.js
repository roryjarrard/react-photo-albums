import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store';
import SkeletonLoader from './SkeletonLoader';

const UsersList = () => {
    const dispatch = useDispatch();

    const {data, isLoading, error} = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (isLoading) {
        return <SkeletonLoader times={6} className="h-10 w-full" />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <div>{data.length}</div>;
};

export default UsersList;