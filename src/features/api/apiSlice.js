import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  tagTypes: ['Posts', 'SinglePost', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => ({
        url: `/articles?limit=5&offset=${(page - 1) * 5}`,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      providesTags: ['Posts'],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: '/user',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      providesTags: ['User'],
    }),
    getSinglePost: builder.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      providesTags: ['SinglePost'],
    }),
    registerNewUser: builder.mutation({
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: { user: { ...credentials } },
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
    logInUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: { user: { ...credentials } },
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
    editUser: builder.mutation({
      query: (editedUser) => ({
        url: '/user',
        method: 'PUT',
        body: { user: { ...editedUser } },
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/articles',
        method: 'POST',
        body: { article: { ...newPost } },
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      invalidatesTags: ['Posts'],
    }),
    editPost: builder.mutation({
      query: (args) => ({
        url: `/articles/${args.slug}`,
        method: 'PUT',
        body: { article: { ...args.editedPost } },
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      invalidatesTags: ['Posts', 'SinglePost'],
    }),
    deletePost: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      invalidatesTags: ['Posts', 'SinglePost'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetCurrentUserQuery,
  useGetSinglePostQuery,
  useRegisterNewUserMutation,
  useLogInUserMutation,
  useEditUserMutation,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = apiSlice;
