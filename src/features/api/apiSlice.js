import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  tagTypes: ['Posts', 'SinglePost', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => ({
        url: `/articles?limit=5&offset=${(page - 1) * 5}`,
      }),
      providesTags: 'Posts',
    }),
    getSinglePost: builder.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetSinglePostQuery } = apiSlice;
