import { useState, useCallback, Fragment, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { useWord } from "../hooks/useWord";
import debounce from "lodash.debounce";

export default function Asynchronous({ idword, onIdWord = () => {} }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(idword || null); //선택값 관리
  const { handlelikefetchWord } = useWord();

  // idword가 변경되면 value 상태 업데이트
  useEffect(() => {
    if (idword && typeof idword === "object") {
      setValue(idword);
      setOptions([idword].filter(Boolean));
    } else {
      setValue(null);
      setOptions([]);
    }
  }, []);

  const fetchOptions = async (word) => {
    try {
      setLoading(true);
      console.log(">>>>>>>> inputWord >>>>>>", word);
      const res = await handlelikefetchWord(word);
      let data = Array.isArray(res.data?.data) ? res.data.data : [];
      console.log(">>>>>>> data >>>>>>", data);
      if (data.length === 1) {
        const singleOption = data[0];
        setValue(singleOption);
        onIdWord(singleOption);
      } else if (data.length === 0) {
        data = [{ id: null, word }];
        setValue({ id: null, word });
        onIdWord({ id: null, word });
      }
      setOptions(data);

      // 위 로직으로 단순화하고 아래 로직은 잠시 보관
      // if (res.status == 200) {
      //   console.log("200", res);
      //   if (res.data.data.length > 0) {
      //     console.log("300", res.data.data.length);
      //     data = res.data.data;

      //     if (data.length === 1) {
      //       // 백엔드에서 리턴된 값이 1건인 경우
      //       const singleOption = data[0];
      //       setValue(singleOption); // Autocomplete 값 설정
      //       onIdWord(singleOption); // 부모로 전달
      //     }
      //   } else {
      //     //백엔드 결과가 0인 경우
      //     data = [{ id: null, word: word }]; //입력값 그대로 출력
      //     setValue({ id: null, word }); // 입력된 텍스트를 선택 상태로 설정
      //     onIdWord({ id: null, word });
      //     console.log("400", data);
      //   }
      // } else {
      //   //백엔드 오류 처리
      //   data = [{ id: null, word: word }]; //입력값 그대로 출력
      //   setValue({ id: null, word }); // 입력된 텍스트를 선택 상태로 설정
      //   onIdWord({ id: null, word });
      // }
      // setOptions(data);
      // setLoading(false);
    } catch (error) {
      console.error("Error word fetching:", error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  // const handleOpen = () => setOpen(true);

  // const handleClose = () => {
  //   setOpen(false);
  //   setOptions([]);
  // };

  // 디바운스 처리된 검색 함수
  const debouncedFetchOptions = useCallback(
    debounce((word) => {
      fetchOptions(word);
    }, 500),
    []
  );

  const handleInputChange = (e, word) => {
    if (word) {
      debouncedFetchOptions(word);
    }
    // else {
    //   setOptions([]);
    //   setValue(null); // 입력값 초기화 시 선택값 초기화
    //   onIdWord(null);
    // }
  };

  return (
    <Autocomplete
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "grey", borderWidth: "2px" },
        },
      }}
      fullWidth
      open={open}
      value={value} // 선택된 값 설정
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={handleInputChange} //입력값 변경 이벤트 핸들러
      filterOptions={() => []} // Disable built-in
      onChange={(event, newValue) => {
        console.log("onChange", newValue);
        setValue(newValue || null); // 선택된 값이 없으면 null로 설정
        if (newValue) {
          onIdWord({ id: newValue.id, word: newValue.word });
        } else {
          onIdWord(null); // 선택 취소 시 부모에 null 전달
        }
      }}
      // isOptionEqualToValue={(option, value) => option.word === value.word}
      isOptionEqualToValue={(option, value) => option?.word === value?.word}
      getOptionLabel={(option) => option?.word || ""}
      options={options} // 기본값을 빈 배열로 설정
      loading={loading}
      // noOptionsText={loading ? "Loading..." : "No options"} // 옵션이 없을 때 메시지 추가
      renderInput={(params) => (
        <TextField
          {...params}
          label="word"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {/* {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null} */}
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
