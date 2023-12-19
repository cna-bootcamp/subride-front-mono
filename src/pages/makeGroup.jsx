import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Header from "../commmon/header";

const accountList = [
  { content: "018302-04-12345 : KB마이핏통장" },
  { content: "018302-14-12345 : KB마이핏통장" },
  { content: "018302-24-12345 : KB마이핏통장" },
];
const serviceList = [
  { content: "넷플릭스" },
  { content: "쿠팡" },
  { content: "디즈니" },
];

const memebernList = [{ content: "1" }, { content: "2" }, { content: "3" }];
const payDateList = [];

// 문자열로 바꿔주기
for (var i = 1; i <= 31; i++) {
  payDateList.push({ content: i });
}

function makeListProps(lists) {
  return {
    options: lists,
    getOptionLabel: (option) => option.content,
  };
}

function MakeGroup() {
  const accountProps = makeListProps(accountList);
  const serviceProps = makeListProps(serviceList);
  const membernProps = makeListProps(memebernList);
  const payDateProps = makeListProps(payDateList);

  return (
    <>
      <Header></Header>
      <Box
        sx={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack spacing={3}>
          <Autocomplete
            {...accountProps}
            id="대표계좌선택"
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="대표계좌선택" variant="standard" />
            )}
          />
          <Autocomplete
            {...serviceProps}
            id="대표계좌선택"
            disableClearable
            renderOption={(params, options) => (
              <Box {...params} label="대표계좌선택" variant="standard">
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/ad.png 2x`}
                  src={`https://flagcdn.com/w20/ad}.png`}
                  alt=""
                />
                {options.content}
              </Box>
            )}
            renderInput={(params) => (
              <div>
                <TextField
                  {...params}
                  label="구독서비스 선택하기"
                  variant="standard"
                />
              </div>
            )}
          />
          <Autocomplete
            {...membernProps}
            id="멤버수설정"
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="멤버수설정" variant="standard" />
            )}
          />
          <Autocomplete
            {...payDateProps}
            id="결제일"
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="결제일" variant="standard" />
            )}
          />
        </Stack>
      </Box>
    </>
  );
}

export default MakeGroup;
