import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Badge, MenuItem, Typography, Menu, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoreIcon from '@mui/icons-material/MoreVert';
import { cleanerUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";

export default function PrimarySearchAppBar({ mobileOpen, handleDrawerToggle }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const typeUser = localStorage.getItem("typeUser")
  const userNames = localStorage.getItem("userNames")


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  function handledCloseSession() {
    dispatch(cleanerUser());
    setAnchorEl(null);
    handleMobileMenuClose();
    localStorage.removeItem("idUser")
    localStorage.removeItem("typeUser")
    localStorage.removeItem("userNames")
    navigate("/");
  }

  function handledProfile() {
    navigate("/user/profile");
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 0,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 27,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      {typeUser
        ? <MenuItem onClick={handledProfile}>Perfil {userNames}</MenuItem>
        : <MenuItem onClick={() => (navigate("/login"))}>Iniciar Sesión</MenuItem>
      }
      {typeUser
        ? <MenuItem onClick={handledCloseSession}>Cerrar Sesion</MenuItem>
        : ""}

    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right", }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right", }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={() => navigate("/")}>
        {typeUser !== "Administrativo"
          ?
          <IconButton
            size="large"
            aria-label="show 2 new favoritos"
            color="inherit"
            onClick={() => navigate("/favsLanding")}
          >
            <Badge badgeContent={2} color="error">
              <FolderSpecialIcon />
            </Badge>
          </IconButton>
          : ""}
        <p>Favoritos</p>
      </MenuItem>
      <MenuItem>
        {typeUser === "Tutor"
          ? <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <MonetizationOnIcon />
            </Badge>
          </IconButton>
          : ""}
        <p>Carrito</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ width: 35, height: 35 }} />
          </IconButton>
          <Avatar
            alt="Remy Sharp"
            src="/logo-school-vector.jpg"
            sx={{ width: 50, height: 50, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => navigate("/")}
          >
            Gestión Educativa
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {userNames?
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } ,mt:2}}
            >
              Bienvenido {userNames}
            </Typography>
            :""}
            {typeUser !== "Administrativo"
              ?
              <IconButton
                size="large"
                aria-label="show 2 new favoritos"
                color="inherit"
                onClick={() => navigate("/favsLanding")}
              >
                <Badge badgeContent={2} color="error">
                  <FolderSpecialIcon sx={{ width: 40, height: 40 }} />
                </Badge>
              </IconButton>
              : ""}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
