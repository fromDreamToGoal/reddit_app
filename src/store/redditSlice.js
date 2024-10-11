import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubredditPosts } from '../api/reddit';

// Асинхронное действие для получения постов из Reddit
export const fetchPosts = createAsyncThunk('reddit/fetchPosts', async (subreddit) => {
  const posts = await fetchSubredditPosts(subreddit);  // Используем функцию из reddit.js
  return posts;
});

const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    selectedSubreddit: '/pics',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default redditSlice.reducer;