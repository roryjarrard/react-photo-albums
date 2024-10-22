import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import Button from './Button';

const PhotosList  = ({ album }) => {
   const response = useFetchPhotosQuery(album);

   const [addPhoto, addPhotoResults] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
    };
   
   return <div>
    <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">
            Photos in {album.ttitle}
        </h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
            + Add Photo
        </Button>
    </div>
   </div>;
};

export default PhotosList;