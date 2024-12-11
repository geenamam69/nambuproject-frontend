import axiosInstance from "../utils/axiosInstance.js";

// 단어 조회 (리턴정보 전체 받아옴)
export const fetchWord = async (id, accessToken) => {
  const response = await axiosInstance.post("/api/word/type/1", { id });
  return response;
};

//단어 조회 word로 하는 임시 메소드 추가
export const fetchWord2 = async (word, accessToken) => {
  const response = await axiosInstance.post("/api/word/type/6", { word });
  return response;
};

// 콤보박스 조회 (리턴정보 전체 받아옴)
export const likefetchWord = async (word, accessToken) => {
  const response = await axiosInstance.post("/api/word/type/4", { word });
  return response;
};

//사전조회 (데이타만 받아옴)
export const fetchAllbyCategory = async (c_id, accessToken) => {
  const response = await axiosInstance.post("/api/dictionary/type/2", {
    c_id,
  });
  return response;
};

// 단어 등록 (리턴정보 전체 받아옴)
export const addWord = async (newWord, accessToken) => {
  try {
    console.log("wordService.js 26 라인 >>>>>>>>>>>>", newWord);
    const response = await axiosInstance.post("/api/word/type/3", newWord);
    console.log("wordService.js 28 라인 >>>>>>>>>>>>", response);
    return response;
  } catch (error) {
    console.error("Word 등록 오류 :", error);
  }
};

// 단어 수정 (리턴정보 전체 받아옴)
export const updateWord = async (upWord, accessToken) => {
  try {
    console.log("wordService.js 38 라인 >>>>>>>>>>>>", upWord);
    const response = await axiosInstance.post("/api/word/type/5", upWord);
    return response;
  } catch (error) {
    console.error("Word 수정 오류 :");
  }
};

// 단어 삭제 (삭제이외 배열 리턴)
export const deleteWord = async (id, accessToken) => {
  return await axiosInstance.delete(`/api/dictionary/${id}`);
};
