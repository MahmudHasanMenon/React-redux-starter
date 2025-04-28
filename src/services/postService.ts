 import {API_URL} from '../api/endPoints';
 import {getRequest, deleteRequest, postRequest, putRequest} from '../api/request';
import { Post } from '../model/Post';

export const getAllPosts = async () => {
    try {  
        return getRequest(API_URL.getPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const addPost = async(data: Post) => {
    return postRequest(API_URL.getPosts, data);
}

export const updatePost = async(data:Post) => {
    return putRequest(`${API_URL.getPosts}/${data.id}`, data);
}

export const deletePost = async (postId: number) => {
    return deleteRequest(`${API_URL.getPosts}/${postId}`);
}