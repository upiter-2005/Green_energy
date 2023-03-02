import React from "react";

function Error({ content }) {
  return (
    <div
      style={{
        width: "100%",
        color: "#E31414",
        fontSize: "13px",
        textAlign: "center",
        fontWeight: "600",
        position: "absolute",
        top: "100%",
        left: 0,
      }}>
      {content}
    </div>
  );
}

export default Error;
