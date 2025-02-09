import React from "react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  // Convert error object to string if necessary
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "An error occurred";

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 my-2">
      <div className="text-red-500">{errorMessage}</div>
    </div>
  );
};

export default ErrorMessage;