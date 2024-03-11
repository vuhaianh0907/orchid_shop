// @frontend\src\screens\Forbidden.jsx
import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={goBack}>
          Go Back
        </Button>
      }
    />
  );
};

export default Forbidden;
