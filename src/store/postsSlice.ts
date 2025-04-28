import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../model/Post';
import {getAllPosts, deletePost, addPost, updatePost} from '../services';
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

export const createPost = createAsyncThunk('post/addpost', async (payload: Post) => {
    const response = await addPost(payload);
    console.log('addPost response', response);
    return response as Post;
})

export const modifyPost = createAsyncThunk('post/updatedPost', async (payload: Post) => {
    const response = await updatePost(payload);
    return response as Post;
})

export const removePost = createAsyncThunk('post/deletePost', async(id: number) => {
    await deletePost(id); 
    return id;
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
              .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);

              })
            .addCase(removePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removePost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter(post => post.id !== action.payload);
            }) 
            .addCase(modifyPost.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if(index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
    },
})

export default postsSlice.reducer;