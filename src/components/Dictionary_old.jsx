import { useState, useEffect } from "react";
import {
  Grid2,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { green, pink, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useWord } from "../hooks/useWord";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));
const handleDisplay = (data) => {
  // const resultsWithRowNumber = results.map((item, index) => ({
  //   ...item.toJSON(),
  //   rowNumber: index + 1, // 1부터 시작하는 순번 추가
  // }));
  const word = "React란";
  const num = 1; // 데이타 읽어와서 loop 돌려서 읽음
  const c_date = "2024-11-24";
  const des =
    "React라는 용어를 chatGpt를 통해 문의하여 저장해 두었던 사전입니다.";
};

const Dictionary = () => {
  const [c_id, setC_id] = useState(0);
  const [word, setWord] = useState("");
  const [c_date, setC_date] = useState("");
  const [memo, setMemo] = usetState("");
  const [level, setLevel] = useState(0);

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const [expanded5, setExpanded5] = useState(false);
  const { handlefetchCategory, handleDeleteWord } = useWord();

  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };
  const handleExpandClick3 = () => {
    setExpanded3(!expanded3);
  };
  const handleExpandClick4 = () => {
    setExpanded4(!expanded4);
  };
  const handleExpandClick5 = () => {
    setExpanded5(!expanded5);
  };

  return (
    <div>
      <Grid2
        container
        spacing={2}
        sx={{
          height: "80vh", // Full viewport height
          width: "90vw",
          display: "flex", // Use Flexbox for alignment
          justifyContent: "center", // Center horizontally
          alignItems: "centerflex-start", // Center vertically
          ml: 7,
          mt: 4,
        }}
      >
        <Grid2 size={6} sx={{ ml: 3 }}>
          <Select
            id="category"
            fullWidth
            displayEmpty
            value={c_id}
            onChange={(e) => setC_id(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black", // 기본 테두리 색상
                  borderWidth: "2px", // 기본 테두리 두께
                },
                "&:hover fieldset": {
                  borderColor: "blue", // 호버 시 테두리 색상
                },
                "&.Mui-focused fieldset": {
                  borderColor: "green", // 포커스 시 테두리 색상
                  borderWidth: "3px", // 포커스 시 테두리 두께
                },
              },
            }}
          >
            <MenuItem value="">조회할 카테고리 선택해 주세요.</MenuItem>
            <MenuItem value={1}>프로그래밍</MenuItem>
            <MenuItem value={2}>상식</MenuItem>
            <MenuItem value={3}>문학</MenuItem>
            <MenuItem value={4}>전화번호</MenuItem>
            <MenuItem value={5}>꽃나무이름</MenuItem>
          </Select>
        </Grid2>
        <Grid2 size={4} sx={{ mt: 1, ml: 2 }}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              sx={{ width: "150px" }}
              onClick={async (e) => {
                const data = await handlefetchCategory(c_id);
                console.log(
                  "조회후 dictionary category group data 수신 >>",
                  data
                );
                handleDisplay(data);
              }}
            >
              내 사전 조회
            </Button>
            <Button
              onClick={async (e) => {
                const data = await handlefetchWord(word);
                console.log("조회후 dictionary data 수신 >>", data);
                // handleDisplay(data);
              }}
              variant="outlined"
              sx={{ width: "150px" }}
            >
              선택 단어 삭제
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={2.4} pacing={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="number">
                  {`${num}`}
                </Avatar>
              }
              title={`${word}`}
              subheader={`${c_date}`}
            />
            <CardMedia
              component="img"
              height="150"
              image="./logo192.png"
              alt={`${word}_img`}
            />
            <CardContent>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >{`${des}`}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="level">
                <SentimentVeryDissatisfiedIcon fontSize="large" />
              </IconButton>
              <ExpandMore
                expand={expanded1}
                onClick={handleExpandClick1}
                aria-expanded={expanded1}
                aria-label="show more1"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded1} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  React는 Facebook(현재 Meta Platforms)에 의해 개발된 오픈 소스
                  자바스크립트 라이브러리로, 사용자 인터페이스(UI)를 구축하기
                  위해 사용됩니다. React는 컴포넌트 기반 아키텍처를 기반으로
                  하며, 이를 통해 대규모 애플리케이션의 UI를 모듈화하고 재사용
                  가능하게 설계할 수 있습니다.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  주요 특징은 다음과 같습니다: 1. **컴포넌트 기반**: UI를
                  독립적인 컴포넌트 단위로 나누어 설계할 수 있습니다. 각
                  컴포넌트는 자체적인 상태와 로직을 가질 수 있어 관리가
                  용이합니다. 2. **가상 DOM(Virtual DOM)**: React는 변경 사항이
                  실제 DOM에 반영되기 전에 가상 DOM을 통해 변경을 먼저
                  처리하므로, 실제 DOM 조작 횟수를 최소화하여 성능을
                  최적화합니다. 3. **단방향 데이터 바인딩**: 데이터의 흐름이
                  위에서 아래로 일정하게 유지되어 데이터의 변화를 예측하기 쉽고
                  디버깅이 용이합니다. 4. **JSX**: JavaScript를 확장한 문법으로,
                  HTML과 유사한 코드를 사용하여 자바스크립트 파일 안에 UI
                  컴포넌트를 정의할 수 있습니다.
                </Typography>
                <Typography>
                  React는 단순한 뷰 라이브러리로 시작했지만, 현대 웹 개발에서
                  매우 중요한 역할을 차지하고 있으며, 다양한 도구와 생태계가
                  이를 보완하여 하나의 완벽한 프레임워크처럼 사용되기도 합니다.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid2>
        <Grid2 size={2.4} pacing={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="number">
                  2
                </Avatar>
              }
              title={`${word}`}
              subheader="2024-11-24"
            />
            <CardMedia
              component="img"
              height="150"
              image="./react.png"
              alt={`${word}_img`}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                React라는 용어를 chatGpt를 통해 문의하여 저장해 두었던
                사전입니다.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="level">
                <SentimentVerySatisfiedIcon fontSize="large" />
              </IconButton>
              <ExpandMore
                expand={expanded2}
                onClick={handleExpandClick2}
                aria-expanded={expanded2}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded2} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  React는 Facebook(현재 Meta Platforms)에 의해 개발된 오픈 소스
                  자바스크립트 라이브러리로, 사용자 인터페이스(UI)를 구축하기
                  위해 사용됩니다. React는 컴포넌트 기반 아키텍처를 기반으로
                  하며, 이를 통해 대규모 애플리케이션의 UI를 모듈화하고 재사용
                  가능하게 설계할 수 있습니다. 주요 특징은 다음과 같습니다: 1.
                  **컴포넌트 기반**: UI를 독립적인 컴포넌트 단위로 나누어 설계할
                  수 있습니다. 각 컴포넌트는 자체적인 상태와 로직을 가질 수 있어
                  관리가 용이합니다. 2. **가상 DOM(Virtual DOM)**: React는 변경
                  사항이 실제 DOM에 반영되기 전에 가상 DOM을 통해 변경을 먼저
                  처리하므로, 실제 DOM 조작 횟수를 최소화하여 성능을
                  최적화합니다. 3. **단방향 데이터 바인딩**: 데이터의 흐름이
                  위에서 아래로 일정하게 유지되어 데이터의 변화를 예측하기 쉽고
                  디버깅이 용이합니다. 4. **JSX**: JavaScript를 확장한 문법으로,
                  HTML과 유사한 코드를 사용하여 자바스크립트 파일 안에 UI
                  컴포넌트를 정의할 수 있습니다. React는 단순한 뷰 라이브러리로
                  시작했지만, 현대 웹 개발에서 매우 중요한 역할을 차지하고
                  있으며, 다양한 도구와 생태계가 이를 보완하여 하나의 완벽한
                  프레임워크처럼 사용되기도 합니다.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid2>
        <Grid2 size={2.4} pacing={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="number">
                  3
                </Avatar>
              }
              title={`${word}`}
              subheader="2024-11-24"
            />
            <CardMedia
              component="img"
              height="150"
              image="./react.png"
              alt={`${word}_img`}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                React라는 용어를 chatGpt를 통해 문의하여 저장해 두었던
                사전입니다.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="level">
                <SentimentVerySatisfiedIcon fontSize="large" />
              </IconButton>
              <ExpandMore
                expand={expanded3}
                onClick={handleExpandClick3}
                aria-expanded={expanded3}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded3} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  React는 Facebook(현재 Meta Platforms)에 의해 개발된 오픈 소스
                  자바스크립트 라이브러리로, 사용자 인터페이스(UI)를 구축하기
                  위해 사용됩니다. React는 컴포넌트 기반 아키텍처를 기반으로
                  하며, 이를 통해 대규모 애플리케이션의 UI를 모듈화하고 재사용
                  가능하게 설계할 수 있습니다. 주요 특징은 다음과 같습니다: 1.
                  **컴포넌트 기반**: UI를 독립적인 컴포넌트 단위로 나누어 설계할
                  수 있습니다. 각 컴포넌트는 자체적인 상태와 로직을 가질 수 있어
                  관리가 용이합니다. 2. **가상 DOM(Virtual DOM)**: React는 변경
                  사항이 실제 DOM에 반영되기 전에 가상 DOM을 통해 변경을 먼저
                  처리하므로, 실제 DOM 조작 횟수를 최소화하여 성능을
                  최적화합니다. 3. **단방향 데이터 바인딩**: 데이터의 흐름이
                  위에서 아래로 일정하게 유지되어 데이터의 변화를 예측하기 쉽고
                  디버깅이 용이합니다. 4. **JSX**: JavaScript를 확장한 문법으로,
                  HTML과 유사한 코드를 사용하여 자바스크립트 파일 안에 UI
                  컴포넌트를 정의할 수 있습니다. React는 단순한 뷰 라이브러리로
                  시작했지만, 현대 웹 개발에서 매우 중요한 역할을 차지하고
                  있으며, 다양한 도구와 생태계가 이를 보완하여 하나의 완벽한
                  프레임워크처럼 사용되기도 합니다.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid2>
        <Grid2 size={2.4} pacing={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="number">
                  4
                </Avatar>
              }
              title={`${word}`}
              subheader="2024-11-24"
            />
            <CardMedia
              component="img"
              height="150"
              image="./react.png"
              alt={`${word}_img`}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                React라는 용어를 chatGpt를 통해 문의하여 저장해 두었던
                사전입니다.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="level">
                <SentimentNeutralIcon fontSize="large" />
              </IconButton>
              <ExpandMore
                expand={expanded4}
                onClick={handleExpandClick4}
                aria-expanded={expanded4}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded4} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  React는 Facebook(현재 Meta Platforms)에 의해 개발된 오픈 소스
                  자바스크립트 라이브러리로, 사용자 인터페이스(UI)를 구축하기
                  위해 사용됩니다. React는 컴포넌트 기반 아키텍처를 기반으로
                  하며, 이를 통해 대규모 애플리케이션의 UI를 모듈화하고 재사용
                  가능하게 설계할 수 있습니다.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  주요 특징은 다음과 같습니다: 1. **컴포넌트 기반**: UI를
                  독립적인 컴포넌트 단위로 나누어 설계할 수 있습니다. 각
                  컴포넌트는 자체적인 상태와 로직을 가질 수 있어 관리가
                  용이합니다. 2. **가상 DOM(Virtual DOM)**: React는 변경 사항이
                  실제 DOM에 반영되기 전에 가상 DOM을 통해 변경을 먼저
                  처리하므로, 실제 DOM 조작 횟수를 최소화하여 성능을
                  최적화합니다. 3. **단방향 데이터 바인딩**: 데이터의 흐름이
                  위에서 아래로 일정하게 유지되어 데이터의 변화를 예측하기 쉽고
                  디버깅이 용이합니다. 4. **JSX**: JavaScript를 확장한 문법으로,
                  HTML과 유사한 코드를 사용하여 자바스크립트 파일 안에 UI
                  컴포넌트를 정의할 수 있습니다.
                </Typography>
                <Typography>
                  React는 단순한 뷰 라이브러리로 시작했지만, 현대 웹 개발에서
                  매우 중요한 역할을 차지하고 있으며, 다양한 도구와 생태계가
                  이를 보완하여 하나의 완벽한 프레임워크처럼 사용되기도 합니다.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid2>
        <Grid2 size={2.4} pacing={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="number">
                  5
                </Avatar>
              }
              title={`${word}`}
              subheader="2024-11-24"
            />
            <CardMedia
              component="img"
              height="150"
              image="./react.png"
              alt={`${word}_img`}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                React라는 용어를 chatGpt를 통해 문의하여 저장해 두었던
                사전입니다.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="level">
                <SentimentVerySatisfiedIcon fontSize="large" />
              </IconButton>
              <ExpandMore
                expand={expanded5}
                onClick={handleExpandClick5}
                aria-expanded={expanded5}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded5} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  React는 Facebook(현재 Meta Platforms)에 의해 개발된 오픈 소스
                  자바스크립트 라이브러리로, 사용자 인터페이스(UI)를 구축하기
                  위해 사용됩니다. React는 컴포넌트 기반 아키텍처를 기반으로
                  하며, 이를 통해 대규모 애플리케이션의 UI를 모듈화하고 재사용
                  가능하게 설계할 수 있습니다.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  주요 특징은 다음과 같습니다: 1. **컴포넌트 기반**: UI를
                  독립적인 컴포넌트 단위로 나누어 설계할 수 있습니다. 각
                  컴포넌트는 자체적인 상태와 로직을 가질 수 있어 관리가
                  용이합니다. 2. **가상 DOM(Virtual DOM)**: React는 변경 사항이
                  실제 DOM에 반영되기 전에 가상 DOM을 통해 변경을 먼저
                  처리하므로, 실제 DOM 조작 횟수를 최소화하여 성능을
                  최적화합니다. 3. **단방향 데이터 바인딩**: 데이터의 흐름이
                  위에서 아래로 일정하게 유지되어 데이터의 변화를 예측하기 쉽고
                  디버깅이 용이합니다. 4. **JSX**: JavaScript를 확장한 문법으로,
                  HTML과 유사한 코드를 사용하여 자바스크립트 파일 안에 UI
                  컴포넌트를 정의할 수 있습니다.
                </Typography>
                <Typography>
                  React는 단순한 뷰 라이브러리로 시작했지만, 현대 웹 개발에서
                  매우 중요한 역할을 차지하고 있으며, 다양한 도구와 생태계가
                  이를 보완하여 하나의 완벽한 프레임워크처럼 사용되기도 합니다.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid2>
        <Grid2 item>
          <Stack spacing={2}>
            <Pagination count={10} color="primary" fontSize="large" />
          </Stack>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Dictionary;
