import {axiosInstance} from '../api/axiosInstance';
import {API_URL} from '../api/endPoints';
 import {getRequest} from '../api/request';

export const getAllPosts = async () => {
    try {  
        return getRequest(API_URL.getPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}