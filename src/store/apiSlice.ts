import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Post} from '../model/Post';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ['Posts'], // To support cache invalidation
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts',
            providesTags: ['Posts'],
          }),

            // 2. POST create post
    createPost: builder.mutation<Post, Partial<Post>>({
        query: (newPost) => ({
          url: '/posts',
          method: 'POST',
          body: newPost,
        }),
        invalidatesTags: ['Posts'], // Refetch posts after creating
      }),

      // 3. PUT update post
    updatePost: builder.mutation<Post, Post>({
        query: (post) => ({
          url: `posts/${post.id}`,
          method: 'PUT',
          body: post,
        }),
        invalidatesTags: ['Posts'], // Refetch posts after update
      }),

          // 4. DELETE post
    deletePost: builder.mutation<{ id: number }, number>({
        query: (id) => ({
          url: `posts/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Posts'], // Refetch posts after delete
      }),
  
    }),
})

// Auto-generated hooks
export const { 
    useGetPostsQuery, 
    useCreatePostMutation, 
    useUpdatePostMutation, 
    useDeletePostMutation 
  } = apiSlice;
  