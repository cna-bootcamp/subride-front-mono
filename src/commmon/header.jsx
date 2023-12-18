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
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Sub 탈래??
          </Link>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Header;
