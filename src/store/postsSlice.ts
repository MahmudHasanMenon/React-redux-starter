import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../model/Post';
import {getAllPosts} from '../services';
import {createAsyncThunk} from '@reduxjs/toolkit'; 

 
interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await getAllPosts();
        console.log('fetchPosts response', response);
        return response as Post[];
    })

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts';
              })
    },
})

export default postsSlice.reducer;