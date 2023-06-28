import React from "react";

const Button = (props) => {
  const { label, loading = false, onClick, style = "btn-primary" } = props;

  return (
    <button
      className={`btn mr-2 ${style}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
