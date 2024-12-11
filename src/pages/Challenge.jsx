import React, { useState } from "react";
import TabMenu from "../components/TabMenu"; 
import Category from "../components/Category";
import ChallengeViewer from "../components/ChallengeViewer";
import axiosInstance from "../utils/axiosInstance";
import "./Challenge.css"

const Challenge = () => {
  const [c_id, setCategoryId] = useState(null);
  const [limit, setLimit] = useState(10);
  const [dictionarys, setDictionarys] = useState([]);

  const handleFetchData = async () => {
    // console.log(`challenge.jsx 14line c_id:${c_id}, limit:${limit}`)
    if (!c_id || limit <= 0) {
      alert("카테고리를 선택하고 올바른 숫자를 입력하세요.");
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/level/category?c_id=${c_id}&limit=${limit}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }  
      const data = response.data.data;  // Axios는 `data`에 응답 본문이 포함됨

      // console.log(`challenge.jsx 27line ${data}`)
       
      const shuffledDictionarys = data.sort(() => Math.random() - 0.5); // 데이터 랜덤 섞기
    
      setDictionarys(shuffledDictionarys);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  return (
    //<div className="page-container">
    <div>
      <TabMenu />
      <div className="search-container">
        <Category onSelect={setCategoryId} />
        <div className="number-input-container">
          <input 
            type="text"
            min="1"
            placeholder="숫자 입력" 
            value={limit}
            onFocus={(e) => {
              e.target.select(); // 포커스 시 전체 선택
            }}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                setLimit(inputValue); // 입력된 값을 상태에 반영
              }
            }}
            onBlur={(e) => {
              if (!/^\d+$/.test(e.target.value)) {
                alert("숫자만 입력 가능합니다."); // 숫자가 아니면 경고
                setLimit(""); // 값을 초기화
              }
            }}
          />            
          <button onClick={handleFetchData}>조회</button>
        </div>
      </div>
      <div className="page-content">
        <ChallengeViewer dictionarys={dictionarys} />
      </div>
    </div>
  );
};

export default Challenge;