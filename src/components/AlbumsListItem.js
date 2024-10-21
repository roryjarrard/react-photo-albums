import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

const AlbumsListItem = ({ album }) => {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    };

    const header = <>
        <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveAlbum}>
            <GoTrashcan />
        </Button>
        {album.title}
    </>;

    return <ExpandablePanel key={album.id} header={header}>
        List of photos for album {album.title}
    </ExpandablePanel>;
};

export default AlbumsListItem;