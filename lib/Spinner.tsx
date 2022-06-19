import React from "react";
import { Triangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  return (
    <div>
      <Triangle color="primary" ariaLabel="loading-indicator" />
    </div>
  );
};

export default Spinner;
