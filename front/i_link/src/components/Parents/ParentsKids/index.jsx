// 2022.08.02 안정현 기본 페이지 구성 //

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { colorPalette } from "../../../constants/constants";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import BoyIcon from '@mui/icons-material/Boy';

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

//이미지 업로드
const Uploader = () => {
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "/images/user.png",
  });

  let inputRef; //이미지 미리보기를 위해서 Ref를 사용

  //이미지 저장
  const saveImage = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(event.target.files[0]);
      setImage(() => ({
        image_file: event.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };
/////////// 수정 필요 ///////////////////
  //이미지 서버로 보내기
  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData();
      formData.append("file", image.image_file);
      await axios.post("/parents/registkid", formData); //주소입력
      alert("서버에 등록완료 되었습니다!");
      setImage({
        image_file: "",
        preview_URL: "/images/user.png",
      });
    } else {
      alert("사진을 등록하세요!");
    }
  };

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, []);
///////////////////////////////////////
  return (
    <Box
      
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* 이미지 삽입 */}
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        onClick={(event) => (event.target.value = null)} // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      {/* 이미지 창 */}
      <Box borderRadius="50%" onClick={() => inputRef.click()}>
        <img
          style={{
            borderRadius: "50%",
            height: "200px",
            width: "200px",
          }}
          src={image.preview_URL}
        />
      </Box>
    </Box>
  );
};

// 남여 성별 체크 버튼
const ColorToggleButton = () => {
  const [alignment, setAlignment] = React.useState("male");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="warning"
      value={alignment}
      exclusive
      onChange={handleChange}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      fullWidth
      sx={{ background: "white" }}

    >
      <ToggleButton value="male" id="font_test" startIcon= {<BoyIcon/>}>
        남자
      </ToggleButton>
      <ToggleButton value="female" id="font_test" startIcon= {<BoyIcon/>}>여자</ToggleButton>
    </ToggleButtonGroup>
  );
};

const theme = createTheme();

export default function ParentsKids() {
  // validation
  const initialValues = { kidsname: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // 에러메시지(아이 이름 미입력시)
  const validate = () => {
    const errors = {};
    if (!formValues.kidsname) {
      errors.kidsname = "아이의 이름을 입력해주세요.";
    }
    return errors;
  };
  // 아이 등록 버튼 클릭 시
  const handleSubmit = async (event) => {
    event.preventDefault();
    //////////////////////////////////////////////
    // 유효성 검사 통과 시 axios 실행 해야함... ㅎㅎ
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  //아이 등록 form 입력 시
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 로고 이미지 */}
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt="Academy"
            src="/images/logo.png"
          ></Avatar>
          {/* 아이등록 title */}
          <Typography id="font_test" component="h1" variant="h4">
            아이등록
          </Typography>
          {/* 아이등록 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* 이미지 업로드 */}
              <Grid item xs={12} sm={12}>
                <Uploader sx={{ width: 60, height: 60 }}></Uploader>
              </Grid>
              {/* 아이 이름 입력창 */}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="kidsname"
                  label="아이 이름"
                  name="kidsname"
                  autoComplete="kidsname"
                  autoFocus
                  value={formValues.kidsname}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p id="font_size_test" align="center">{formErrors.kidsname}</p>
              </Grid>
              {/* 아이 생년월일 입력창 */}
              <Grid item xs={12} sm={12}>
                <p id="font_test" align="center">아이의 생년월일을 입력해주세요</p>
                <TextField
                  required
                  fullWidth
                  id="date"
                  label=""
                  autoComplete="date"
                  name="date"
                  autoFocus
                  type="date"
                  sx={{ background: "white" }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <p id="font_test" align="center">아이의 성별을 선택해주세요</p>
                <ColorToggleButton></ColorToggleButton>
              </Grid>
            </Grid>
            {/* 아이등록 버튼 */}
            <Button
              id="font_test"
              type="submit"
              fullWidth
              variant="contained"
              style={{ background:colorPalette.BUTTON_COLOR }}
              sx={{ mt: 5, mb: 5 }}
              onChange={handleSubmit}
              size="large"
            >
              아이등록
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
