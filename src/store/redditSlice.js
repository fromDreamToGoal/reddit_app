import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubredditPosts, fetchPostComments } from '../api/reddit';

// Асинхронное действие для получения постов из Reddit
export const fetchPosts = createAsyncThunk('reddit/fetchPosts', async (subreddit) => {
  const posts = await fetchSubredditPosts(subreddit);  // Используем функцию из reddit.js
  return posts;
});

//Асинхронное действие для получения комментариев к посту Reddit
export const fetchComments = createAsyncThunk('reddit/fetchComments', async ({ subreddit, postId }) => {
  const comments = await fetchPostComments(subreddit, postId);  // Используем функцию из reddit.js
  return { postId, comments };
});

const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    posts: [],
    comments: {},
    status: 'idle',
    statusComments: 'idle',
    error: null,
    selectedSubreddit: '/reactjs',
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
      })
      .addCase(fetchComments.pending, (state) => {
        state.statusComments = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.statusComments = 'succeeded';
        state.comments[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.statusComments = 'failed';
        state.error = action.error.message;
      });
  },
});

export default redditSlice.reducer;