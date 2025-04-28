import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { fetchPosts } from "../../store/postsSlice";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../../store";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  console.log("Posts:", posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: "red",
        height: "100%",
        width: "100d%",
        margin: "20px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <h1>Dashboard</h1>
      <p>Dashboard page content goes here.</p>
      <button
        className="dash-button"
        onClick={() => {
          localStorage.removeItem("token");
          dispatch(logout());
        }}
      >
        Go to Profile
      </button>

      <div>
        <h2>Posts List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  {/* <button onClick={() => dispatch(removePost(post.id))}>Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
