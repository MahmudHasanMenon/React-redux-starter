import React from "react";
import { Post } from "../../model/Post";
import "./PostModal.css"; // Assuming you have a CSS file for styling

export type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (field: string, value: string) => void;
  postData?: Post | null; // Use Post type for postData
  mode: "create" | "edit";
};

export const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
  postData,
  mode,
}) => {
  if (!isOpen) {
    return null;
  }
  const testID = "PostModal"; // Define a test ID for the component
  return (
    <div className="modal-overlay" data-testid={testID}>
      <div className="modal-content" data-testid={`${testID}_Content`}>
        <h3 data-testid={`${testID}_Title`}>
          {mode === "edit" ? "Edit Post" : "Create Post"}
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
            marginBottom: "20px",
          }}
          data-testid={`${testID}_InputContainer`}
        >
          <input
            type="text"
            placeholder="Title"
            value={postData?.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            data-testid={`${testID}_titleInput`}
          />

          <textarea
            placeholder="Body"
            value={postData?.body || ""}
            onChange={(e) => onChange("body", e.target.value)}
            data-testid={`${testID}_bodyInput`}
          />
        </div>

        <div className="modal-actions">
          <button onClick={onClose} data-testid={`${testID}_cacelButton`}>
            {" "}
            Cancel
          </button>
          <button onClick={onSubmit} data-testid={`${testID}_submitButton`}>
            {mode === "edit" ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};
