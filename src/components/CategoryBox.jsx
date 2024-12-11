import React, { useEffect, useState } from "react";
import "../components/CategoryBox.css";

const CategoryBox = ({ onSelect  }) => {
  const [c_id, setC_id] = useState([
    { c_id: "001", c_name: "Option 1" },
    { c_id: "002", c_name: "Option 2" },
    { c_id: "003", c_name: "Option 3" },
  ]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // DB에서 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories"); // API 엔드포인트 호출
        const data = await response.json();
        setCategories(data); // 데이터 설정
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelect = (e) => {
    const selectedId = e.target.value; // 선택한 c_id
    setSelectedCategory(selectedId);
    onSelect(selectedId); // 상위 컴포넌트에 전달
  };

  return (
    <div>
      <label>
        <select value={selectedCategory} onChange={handleSelect}>
          <option value="">카테고리를 선택하세요</option>
          {categories.map((category) => (
            <option key={category.c_id} value={category.c_id}>
              {category.c_name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default CategoryBox;
