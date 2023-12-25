import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2DC14",
      black: "#000000",
    },
  },
});

function Header() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: "50px",
            fontSize: 30,
            fontWeight: 700,
            borderBottom: "solid 1px #F6F7FA",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "#0E131A" }}>
            <img
              style={{ height: "25px", objectFit: "cover" }}
              src={`./메인로고.png`}
              alt="로고"
            ></img>
          </Link>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Header;
