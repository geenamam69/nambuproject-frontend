import {
  fetchWord,
  fetchWord2,
  likefetchWord,
  addWord,
  updateWord,
  deleteWord,
  fetchAllbyCategory,
} from "../services/wordService";

export const useWord = () => {
  // 단어조회 리턴 전체
  const handlefetchWord = async (id) => {
    try {
      const res = await fetchWord(id);
      return res;
    } catch (error) {
      console.error("Error fetching Word:", error);
    }
  };

  // word로 조회하는 임시 메소드 추가
  const handlefetchWord2 = async (word) => {
    try {
      const res = await fetchWord2(word);
      return res;
    } catch (error) {
      console.error("Error fetching Word:", error);
    }
  };

  //콤보박스 조회 전체 리턴
  const handlelikefetchWord = async (word) => {
    try {
      const res = await likefetchWord(word);
      console.log("useWord.js 라인 25 리턴 데이터 ", res.data.data);
      return res;
    } catch (error) {
      console.error("Error like fetching Word:", error);
    }
  };

  //사전조회 데이터만 리턴
  const handlefetchCategory = async (c_id) => {
    try {
      const res = await fetchAllbyCategory(c_id);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching AllbyCategory:", error);
    }
  };

  //단어 등록 리턴 전체
  const handleAddWord = async (newWord) => {
    try {
      const res = await addWord(newWord);
      return res;
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  //단어 삭제 삭제이외 배열 리턴
  const handleDeleteWord = async (id, prevCardsData) => {
    try {
      const res = await deleteWord(id);
      if (res.status == 204) {
        if (!Array.isArray(prevCardsData)) {
          console.error("prevCardsData is not an array", prevCardsData);
          throw new Error("Invalid data: prevCardsData must be an array");
        }
        const updatedCardsData = prevCardsData.filter((card) => card.id !== id);
        return updatedCardsData;
      }
    } catch (error) {
      console.error("Error deleting word:", error);
      throw error;
    }
  };

  //단어 수정 리턴 전체
  const handleUpdateWord = async (upWord) => {
    try {
      const res = await updateWord(upWord);
      return res;
    } catch (error) {
      console.error("Error updating word:", error);
    }
  };

  const handleinitButton = () => {
    const data = {
      id: null,
      word: "",
      url: "",
      memo: "",
      level: 10,
      input_type: 1,
      email: "",
      des_json: null,
      des: "",
      c_id: null,
      c_data: null,
    };
    return data;
  };

  return {
    handlefetchWord,
    handlefetchWord2,
    handlelikefetchWord,
    handleAddWord,
    handleUpdateWord,
    handleDeleteWord,
    handleinitButton,
    handlefetchCategory,
  };
};
