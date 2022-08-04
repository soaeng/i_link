// Header Layout
// 2022.08.04 김국진 헤더 레이아웃 NavBar Link 작업
import { useEffect, useState, useContext } from "react";
import { sidebar } from "../../constants/constants";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user";
import Logout from "../../components/User/Logout";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [navBar, setNavBar] = useState([]);

  const { userType } = useContext(UserContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoClickHandler = () => {
    alert("wef");
  };

  // 페이지 렌더링 시 회원 타입에 따라 다른 NavBar를 보여주는 동작
  useEffect(() => {
    // NavBar 표시
    setNavBar((navBar) => sidebar[parseInt(userType) - 1]);
  }, []);

  return (
    <Box>
      {/* 헤더색 투명하게 */}
      <Box position="static" style={{ background: "rgba(52, 52, 52, 0)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* LOGO IMAGE */}
            <Avatar
              sx={{ width: 100, height: 100, cursor: "pointer" }}
              alt="Academy"
              src="/images/logo.png"
              onClick={logoClickHandler}
            ></Avatar>

            {/* 여기 파트는 화면 사이즈 줄었을 때 NavBar 드롭다운으로 나타내게하는 컴포넌트 기능. 일단은 사용안할것같아 주석처리만 */}
            {/*
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  background: "black",
                }}
              >
                {navBar.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            */}
            {/* NavBar 구현 박스 */}
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              {/* 회원 타입에 맞는 NavBar 디스플레이 Part */}
              {navBar.map((page) => (
                <Button
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block", mr: 4 }}
                  size="small"
                >
                  <Link
                    href="#"
                    to={page.path}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      id="font_test"
                      variant="h5"
                      textDecoration="none"
                      noWrap
                      href="/teacher/management"
                      color="rgba(0, 0, 0, 0.5)"
                    >
                      {page.name}
                    </Typography>
                  </Link>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Logout />
          </Toolbar>
        </Container>
      </Box>
    </Box>
  );
};
export default Header;
