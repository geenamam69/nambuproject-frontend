import { useState, useEffect } from "react";
import AudioRecorder from "./AudioRecorder";
import Asynchronous from "./Asynchronous";
import { useWord } from "../hooks/useWord";
import { speechToText, getGptResponse } from "../hooks/api";
import { useAuth } from "../context/AuthContext";
import Category from "./Category";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Stack, TextField, Grid2 } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Word = () => {
  const location = useLocation();
  const searchText = location.state?.word || "말모이"; // 전달받은 값
  const getInputType = location.state?.input_type; // 전달받은 값
  const getGptClick = location.state?.gptclick; // 전달받은 값

  const [word, setWord] = useState(searchText);
  const [id, setId] = useState(null);
  const [des, setDes] = useState("");
  const [c_id, setC_id] = useState(null);
  const [memo, setMemo] = useState("");
  const [input_type, setInput_type] = useState(() => getInputType ?? 1);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { handlefetchWord, handleAddWord, handleUpdateWord, handleinitButton } =
    useWord();

  const notify = () => {
    toast.success("Success notification!");
    toast.error("Error notification!", { position: "bottom-left" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!word || !des) {
      toast.error(`등록 필수항목인 word:${word}와 des:${des} 값을 확인하세요.`);
      return;
    }

    const newWord = {
      word,
      des,
      des_json: "",
      c_id,
      memo,
      url: "",
      input_type,
    };

    // const res = await handleAddWord(newWord);
    // if (res.status == 200) {
    //   toast.success(res.data.message);
    // } else {
    //   toast.error(res.data.message);
    // }

    try {
      const res = await handleAddWord(newWord);

      if (res?.status === 200 && res?.data?.message) {
        toast.success(res.data.message);
      } else {
        toast.error(
          res?.data?.message ||
            "등록 중 오류발생. 중복 데이타가 있는지 확인하세요."
        );
      }
    } catch (error) {
      console.error("등록 요청 중 오류 발생:", error);
      toast.error("서버와의 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDisplay = (data) => {
    const {
      id,
      word,
      url,
      memo,
      level,
      input_type,
      email,
      des_json,
      des,
      c_id,
      c_data,
    } = data;
    setWord(id);
    setWord(word);
    setDes(des);
    setC_id(c_id);
    setMemo(memo);
  };

  //   const handleDisplay = (data) => {
  //     const { word, des, c_id, memo } = data; // 필요한 값만 추출
  //     setWord(word);
  //     setDes(des);
  //     setC_id(c_id);
  //     setMemo(memo);
  //   };

  const handleAudioCatured = async (audioBlob) => {
    try {
      //1. stt
      const speechText = await speechToText(audioBlob);
      setWord(speechText);
      //2. gpt
      await handlechatGpt(speechText);
      setInput_type(2);
    } catch (error) {
      console.log("오류 발생:", error);
      toast.error("오디오 처리 중 오류가 발생했습니다.");
    }
  };

  const handlechatGpt = async (word) => {
    try {
      // gpt
      const gptResponse = await getGptResponse(word);
      setDes(gptResponse);
      setC_id(null);
      setMemo("");
    } catch (error) {
      console.log("chatGpt 오류 발생", error);
      toast.error("ChatGPT 응답 처리 중 오류가 발생했습니다.");
    }
  };

  // 페이지 로드 시 getGptClick 값에 따라 handlechatGpt 호출
  useEffect(() => {
    if (getGptClick === 1) {
      handlechatGpt(searchText);
    }
  }, [getGptClick, searchText]);

  // 컴포넌트로 부터 전달받은 id 와 word를 업데이트
  const handlesetIdWord = (data) => {
    if (!data) {
      console.warn("Invalid data received in handlesetIdWord:", data);
      setId(null);
      setWord("");
      return;
    }
    setId(data.id);
    setWord(data.word);
    console.log("Updated id:", data.id, "Updated word:", data.word);
  };

  return (
    <div>
      <Grid2
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          height: "80vh", // Full viewport height
          width: "90vw",
          display: "flex", // Use Flexbox for alignment
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          ml: 10,
          mt: 4,
        }}
      >
        <Grid2 size={8}>
          <Asynchronous idword={{ id, word }} onIdWord={handlesetIdWord} />
          {/* <Asynchronous idword={idword} onIdWord={setIdWord} /> */}
        </Grid2>
        <Grid2 size={1}>
          <AudioRecorder onAudioCaptured={handleAudioCatured}></AudioRecorder>
        </Grid2>
        <Grid2 size={3}>
          <Stack spacing={2} direction="row">
            <Button
              onClick={(e) => {
                handlechatGpt(word);
              }}
              variant="contained"
              sx={{ width: "150px" }} //backgroundColor: "primary.main"
            >
              chatGpt 조회
            </Button>
            <Button
              variant="outlined"
              sx={{ width: "150px" }}
              onClick={async (e) => {
                if (!id) {
                  toast.error("등록중인 단어가 없습니다. 신규등록 하세요.");
                  return;
                }
                const res = await handlefetchWord(id);
                console.log("조회된 데이타 출력 >>>>>>>>>", res);
                console.log("조회된 데이타 상태 >>>>>>>>>", res.status);
                console.log(
                  "조회된 데이타 배열 >>>>>>>>>",
                  res.data.data.length
                );
                if (res.status == 200) {
                  const data = res.data.data;
                  toast.success(res.data.message);
                } else {
                  toast.error(res.data.message);
                }
              }}
            >
              내 사전 조회
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            id="des-input"
            label="des"
            fullWidth
            multiline
            rows={10}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "grey", borderWidth: "2px" },
              },
            }}
            value={des}
            onChange={(e) => setDes(e.target.value)}
          />
        </Grid2>
        <Grid2 size={8}>
          <Category width="100%" cid={c_id} onSelect={setC_id} />
        </Grid2>
        <Grid2 size={4}></Grid2>
        <Grid2 size={12}>
          <TextField
            id="memo-input"
            label="memo"
            multiline
            fullWidth
            rows={3}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "grey", borderWidth: "2px" },
              },
            }}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </Grid2>
        <Grid2>
          <Stack spacing={2} direction="row">
            <Button type="submit" variant="contained" sx={{ width: "150px" }}>
              등록
            </Button>
            <Button
              variant="contained"
              sx={{ width: "150px" }}
              onClick={async (e) => {
                if (!id) {
                  toast.error("다시 조회후 수정하세요.");
                  return;
                }
                const upWord = { id, word, des, c_id, memo, input_type };
                const res = await handleUpdateWord(id);
                console.log("수정후 리턴 출력 >>>>>>>>>", res);
                console.log("수정후 데이타 상태 >>>>>>>>>", res.status);
                console.log("수정후 데이타 출력 >>>>>>>>>", res.data.data);
                if (res.status == 200) {
                  const data = res.data.data;
                  toast.success(
                    "입력된 단어의 내 사전 조회가 완료 되었습니다."
                  );
                  handleDisplay(data);
                } else {
                  toast.error("내 사전 조회중 오류가 발생하였습니다.");
                }
              }}
            >
              수정
            </Button>
            <Button
              onClick={(e) => {
                const data = handleinitButton();
                console.log("handleinitButton>>>>", data);
                handleDisplay(data);
              }}
              variant="outlined"
              sx={{ width: "150px" }}
            >
              초기화
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default Word;
