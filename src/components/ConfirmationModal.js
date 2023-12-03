import React from "react";

export default function ConfirmationModal({ message, onCancel, onConfirm }) {
  return (
    <div className="confirm">
      <div className="confirm-content">
        <p>{message}</p>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="delete-button" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  );
}
