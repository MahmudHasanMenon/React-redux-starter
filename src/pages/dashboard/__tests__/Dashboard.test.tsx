import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import Dashboard from "../Dashboard";
import configureStore from "redux-mock-store";
import { fetchPosts } from "../../../store/postsSlice";
import "axios";

const mockStore = configureStore();

jest.mock("../../../store/postsSlice", () => ({
  fetchPosts: jest.fn(),
  removePost: jest.fn(),
  createPost: jest.fn(),
  modifyPost: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Dashboard", () => {
  const initialState = {
    postsReducer: {
      posts: [
        { id: 1, title: "Post One", body: "Body of post one" },
        { id: 2, title: "Post Two", body: "Body of post two" },
      ],
      loading: false,
      error: null,
    },
  };
  it("should render Posts List title", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(fetchPosts).toHaveBeenCalled();
    expect(screen.getByTestId("posts-list-title")).toBeInTheDocument();
  });
});
