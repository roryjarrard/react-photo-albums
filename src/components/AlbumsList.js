import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import SkeletonLoader from './SkeletonLoader';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

const AlbumsList = ({ user }) => {
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    };

    let content = null;
    if (isFetching) {
        content = <SkeletonLoader className="h-10 w-full" times={3} />;
    } else if (error) {
        content = <div>Error loading albums.</div>;
    } else {
        content = data.map((album) => {
            return <AlbumsListItem key={album.id} album={album} />;
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