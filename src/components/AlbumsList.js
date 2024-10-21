import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import SkeletonLoader from './SkeletonLoader';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

const AlbumsList = ({ user }) => {
    const { data, error, isLoading } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    };

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
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Albums for {user.name}</h3>
            <Button loading={results.isLoading} onClick={handleAddAlbum}>+ Add Album</Button>
        </div>
        <div>{content}</div>
    </div>
    );
};

export default AlbumsList;