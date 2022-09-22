import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, Divider, ListItemText, Typography, Toolbar } from '@mui/material';
import Paid from "@mui/icons-material/Paid";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import School from "@mui/icons-material/School";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
const drawerWidth = 240;

export default function ResponsiveDrawer({ mobileOpen, handleDrawerToggle }) {

  const { window } = () => Window;
  const typeUser = localStorage.getItem("typeUser")

  let menuLinks = [];

  switch (typeUser) {
    case "Administrativo":
      menuLinks = [
        { link: "/users", text: "Usuarios", icon: <PeopleAlt /> },
        { link: "/noticiasAdmin", text: "Noticias", icon: <NewspaperIcon /> },
        {
          link: "/notifications/admin",
          text: "Notificaciones",
          icon: <MailIcon />,
        },
        { link: "/students", text: "Alumnos", icon: <School /> },
        { link: "/payments", text: "Pagos", icon: <Paid /> },
      ];
      break;

    case "Tutor": menuLinks = [{ link: "/notifications/tutor", text: 'Notificaciones', icon: <MailIcon /> },
    { link: "/", text: 'Boletines', icon: <School /> },
    { link: "/payments", text: 'Pagos', icon: <Paid /> }]
      break;
    default:
      break;
  }

  const drawer = (
    <div>

      <Toolbar>
      </Toolbar>
      <CssBaseline />
      <Divider />
      <Typography gutterBottom variant="h5" sx={{ m: 1 }}>{typeUser === "Administrativo" ? "Administracion" : "Accesos"}</Typography>
      <Divider />
      <List>
        {menuLinks.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <Link
              to={item.link}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
