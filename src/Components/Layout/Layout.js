import * as React from 'react';
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import { useDispatch } from 'react-redux';
import {getByIdUser} from '../Users/usersActions'

const drawerWidth = 240; 

function Layout({ children }) {

    const dispatch = useDispatch()

    const idUser = localStorage.getItem("idUser")
    useEffect(() => {
        if(idUser)
            dispatch(getByIdUser(idUser))
    }, [dispatch,idUser])
    const typeUser = localStorage.getItem("typeUser")
    //Para manejo de responsive de la Sidebar
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    }; 

    return (
        <div>
            <head>
                <title>School Manage</title>
                <meta name="description" content="Grupo Nº6 Henry 27b" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <Box sx={{ display: 'flex' }}>{/* Coloca sidebar y children uno al lado del otro */}
                {idUser!==null ? <Sidebar typeUser={typeUser} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} /> : "" }
                <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>{/* calcula el espacio que tiene que defasar el componente principal para que no quede debajo de la sidebar */}
                    <Navbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />{/* Configurada para estar sobre los elementos */}
                    <Toolbar /> {/* genera un espacio en blanco para que no quede debajo de la Navbar */}
                    {children}{/* componente recibido por props para ser mostrado en cuadrante vacio */}
                </Box>
            </Box>
        </div>
    );

}
export default Layout