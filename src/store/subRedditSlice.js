import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронный thunk для получения сабреддитов
export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async () => {
    const response = await fetch('https://www.reddit.com/subreddits/popular.json');
    const data = await response.json();
    return data.data.children.map(subreddit => subreddit.data);
  }
);

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: {
    subreddits: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.subreddits = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default subredditsSlice.reducer;