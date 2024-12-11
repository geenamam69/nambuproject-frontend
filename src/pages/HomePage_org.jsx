import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    if (type === "word") {
      navigate("/word");
    } else if (!user) {
      navigate("/login");
    } else {
      navigate(`/${type}`);
    }
  };

  return (
    <div className="homepage-container">
      <input type="text" placeholder="Search..." className="search-box" />
      <div className="button-group">
        <button onClick={() => handleButtonClick("word")}>말입력</button>
        <button onClick={() => handleButtonClick("challenge")}>암기</button>
        <button onClick={() => handleButtonClick("dictionary")}>사전</button>
      </div>
    </div>
  );
};

export default HomePage;
