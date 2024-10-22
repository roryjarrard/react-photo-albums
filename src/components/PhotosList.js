import { useFetchPhotosQuery } from '../store';

const PhotosList  = ({ album }) => {
   const response = useFetchPhotosQuery(album);
   console.log(response);
    return <div>Photos for album {album.title}</div>;
};

export default PhotosList;