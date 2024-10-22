import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import Button from './Button';
import SkeletonLoader from './SkeletonLoader';
import PhottosListItem from './PhotosListItem';

const PhotosList  = ({ album }) => {
   const {data, error, isFetching} = useFetchPhotosQuery(album);

   const [addPhoto, addPhotoResults] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
    };

    let content;
    if (isFetching) {
        content = <SkeletonLoader className="h8 w-8" times={4} />;
    } else if (error) {
        content = <div>Error fetching photos...</div>;
    } else {
        content = data.map((photo) => {
            return <PhottosListItem key={photo.id} photo={photo} />;
        });
    }
   
   return <div>
    <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">
            Photos in {album.ttitle}
        </h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
            + Add Photo
        </Button>
    </div>
    <div>{content}</div>
   </div>;
};

export default PhotosList;