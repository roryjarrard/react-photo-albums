import { useFetchAlbumsQuery } from '../store';
import SkeletonLoader from './SkeletonLoader';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

const AlbumsList = ({ user }) => {
    const { data, error, isLoading } = useFetchAlbumsQuery(user);

    let content = null;
    if (isLoading) {
        content = <SkeletonLoader times={3} />;
    } else if (error) {
        content = <div>Error loading albums.</div>;
    } else {
        content = data.map((album) => {
            const header = <div>{album.title}</div>;
            return <ExpandablePanel key={album.id} header={header}>
                List of photos for album {album.title}
            </ExpandablePanel>;
        });
    }

    return (<div>
        <div>Albums for {user.name}</div>
        <div>{content}</div>
    </div>
    );
};

export default AlbumsList;