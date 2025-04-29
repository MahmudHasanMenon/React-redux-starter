import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import {
    fetchPosts
  } from "../../../store/postsSlice"; 

export const usePosts = () => {  
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading } = useSelector((state: RootState) => state.postsReducer);

    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);

    return {posts, loading};
}