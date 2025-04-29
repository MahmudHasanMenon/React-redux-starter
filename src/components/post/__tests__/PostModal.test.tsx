import { render, screen, fireEvent } from "@testing-library/react";
import { PostModal, PostModalProps } from "../PostModal";

const TestID = {
  Container: "PostModal",
  Content: "PostModal_Content",
  Title: "PostModal_Title",
  InputContainer: "PostModal_InputContainer",
  TitleInput: "PostModal_titleInput",
  BodyInput: "PostModal_bodyInput",
  SubmitButton: "PostModal_submitButton",
  CloseButton: "PostModal_cacelButton",
};
describe("PostModal Component", () => {
  const defaultProps: PostModalProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    postData: { title: "Test Title", body: "Test Body" },
    mode: "create",
  };

  it("should render the modal when isOpen is true", () => {
    render(<PostModal {...defaultProps} />);

    expect(screen.getByTestId(TestID.Container)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Content)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Title)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.InputContainer)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.TitleInput)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.BodyInput)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.SubmitButton)).toBeInTheDocument();
  });

  it("should call onChange when typing title", () => {
    render(<PostModal {...defaultProps} />);
    const titleInput = screen.getByTestId(TestID.TitleInput);
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith("title", "New Title");
  });

  it("should call onChange when typing body", () => {
    render(<PostModal {...defaultProps} />);
    const bodyInput = screen.getByTestId(TestID.BodyInput);
    fireEvent.change(bodyInput, { target: { value: "New Body" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith("body", "New Body");
  });

  it("should call onClose when clicking Cancel", () => {
    render(<PostModal {...defaultProps} />);
    const cancelButton = screen.getByTestId(TestID.CloseButton);
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("should call onSubmit when clicking Submit", () => {
    render(<PostModal {...defaultProps} />);
    const submitButton = screen.getByTestId(TestID.SubmitButton);
    fireEvent.click(submitButton);

    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });
});
