import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    slug: 'how-to-train-your-dragon',
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat. ',
    tags: ['dragons', 'training'],
    createdAt: '2021-02-18T03:22:56.637Z',
    updatedAt: '2021-02-18T03:48:35.824Z',
    favorited: true,
    favoritesCount: 1,
    author: {
      username: 'John Doe',
      bio: 'I work at State Farm.',
      image: 'https://i.stack.imgur.com/xHWG8.jpg',
      following: false,
    },
  },
  {
    slug: 'how-to-train-your-dragon-2',
    title: 'How to train your dragon 2',
    description: 'So toothless',
    body: 'It is a dragon',
    tags: ['dragons', 'training'],
    createdAt: '2021-02-18T03:22:56.637Z',
    updatedAt: '2021-02-18T03:48:35.824Z',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'jake',
      bio: 'I work at State Farm.',
      image: 'https://i.stack.imgur.com/xHWG8.jpg',
      following: false,
    },
  },
];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;
