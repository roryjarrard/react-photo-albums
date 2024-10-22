import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { faker } from '@faker-js/faker';

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
    endpoints: (builder) => {
        return {
            fetchPhotos: builder.query({
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id,
                        },
                        method: 'GET',
                    };
                },
            }),
            addPhoto: builder.query({
                query: (album) => {
                    return {
                        url: '/photos',
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true),
                        },
                        method: 'POST',
                    };
                },
            }),
            removePhoto: builder.query({
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE',
                    };
                },
            }),
        };
    },
});

export const {
    useFetchPhotosQuery,
    useAddPhotoQuery,
    useRemovePhotoQuery,
} = photosApi;
export { photosApi };