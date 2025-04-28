import React from "react";
import { Post } from "../../model/Post";
import "./PostModal.css"; // Assuming you have a CSS file for styling

type PostModalProps = {
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{mode === "edit" ? "Edit Post" : "Create Post"}</h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={postData?.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
          />

          <textarea
            placeholder="Body"
            value={postData?.body || ""}
            onChange={(e) => onChange("body", e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button onClick={onClose}> Cancel</button>
          <button onClick={onSubmit}>
            {mode === "edit" ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};
