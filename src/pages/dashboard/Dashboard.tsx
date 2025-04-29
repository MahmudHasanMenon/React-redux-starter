import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../store/authSlice";
import { removePost, createPost, modifyPost } from "../../store/postsSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../store";

import styles from "./Dashboard.module.css";
import { Post } from "../../model/Post";
import { PostModal } from "../../components/post/PostModal";
import { usePosts } from "./hooks/use-posts";

const Dashboard = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = usePosts();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedPostData, setSelectedPostData] = useState<{
    id?: number;
    userId?: number;
    title: string;
    body: string;
  }>({ userId: 1, title: "", body: "" });

  console.log("Posts:", posts);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerSearchTerm) ||
          post.body.toLowerCase().includes(lowerSearchTerm)
      );
      setFilteredPosts(filtered);
    }
  }, [posts, searchTerm]);

  const handleAddPost = (postData: Post) => {
    const payload: Post = {
      userId: 1,
      id: Math.floor(Math.random() * 1000),
      title: postData.title,
      body: postData.body,
    };

    dispatch(createPost(payload));

    setSelectedPostData({ userId: 1, title: "", body: "" });
    setModalMode("create");
    setIsModalOpen(false);
  };

  const handleDelete = (post: Post) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete post with ID ${post.id}?`
    );
    if (confirmDelete) {
      if (!post) return;
      // Dispatch delete action here
      if (post.id !== undefined) {
        dispatch(removePost(post.id));
      }
    }
  };

  const handleEditPost = (post: Post) => {
    if (!post) return;

    const updatedPost = {
      ...post,
      title: post.title,
      body: post.body,
    };

    dispatch(modifyPost(updatedPost));
    setSelectedPostData({ userId: 1, title: "", body: "" });
    setModalMode("create");
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles["container"]}>
      <h1>Inspection Dashboard</h1>
      {/* <button
        className="dash-button"
        onClick={() => {
          localStorage.removeItem("token");
          dispatch(logout());
        }}
      >
        Go to Profile
      </button> */}

      <div className={styles["posts-table-container"]}>
        <h2 data-testid="posts-list-title">Posts List</h2>

        <h2>Total records found {filteredPosts.length} </h2>

        <div className={styles["table-controls"]}>
          <input
            type="text"
            placeholder="Filter in records..."
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="search-input"
          />
          <div className={styles["create-btn"]}>
            <button
              onClick={() => {
                // handleAddPost();
                setModalMode("create");
                setIsModalOpen(true);
              }}
              data-testid="create-post-button"
            >
              Create New Post
            </button>
          </div>
        </div>
        <table className={styles["posts-table"]}>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <div className={styles["action-btns"]}>
                    <button
                      className={styles["edit-btn"]}
                      onClick={() => {
                        // handleEditPost(post);
                        setSelectedPostData(post);
                        setModalMode("edit");
                        setIsModalOpen(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className={styles["delete-btn"]}
                      onClick={() => {
                        handleDelete(post);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles["pagination-controls"]}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>Page {currentPage}</span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev * postsPerPage < filteredPosts.length ? prev + 1 : prev
              )
            }
            disabled={currentPage * postsPerPage >= filteredPosts.length}
          >
            Next
          </button>
        </div>
      </div>
      {isModalOpen && (
        <PostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {
            // Handle submit logic here
            if (modalMode === "edit") {
              handleEditPost(selectedPostData as Post);
            } else {
              handleAddPost(selectedPostData as Post);
            }
          }}
          onChange={(field, value) => {
            // Handle input change logic here
            setSelectedPostData({ ...selectedPostData, [field]: value });
          }}
          postData={selectedPostData} // Pass the post object if editing
          mode={modalMode}
        />
      )}
    </div>
  );
};

export default Dashboard;
