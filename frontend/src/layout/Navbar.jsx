import { Drawer, Box, Typography, IconButton, Avatar } from '@mui/material'
import styles from './Navbar.module.css'
import { useContext, useState } from "react"
import MenuIcon from '@mui/icons-material/Menu'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';



import Logo from '../assets/logo/logo.jpg'

//? context
import { Context } from "../context/UserContext"
import UserPanel from './components/UserPanel';



export default function Navbar() {

    const [openLogin, setOpenLogin] = useState(false);
    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);


    const [openRegister, setOpenRegister] = useState(false);
    const handleOpenRegister = () => setOpenRegister(true);
    const handleCloseRegister = () => setOpenRegister(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const { authenticated, logout } = useContext(Context)


    return (



        < navbar >
            <nav className={styles.navbar}>
                <div className={styles.iconMenu}>
                    <IconButton
                        onClick={() => setIsDrawerOpen(true)}
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='logo'>
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor='left'
                        open={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}>
                        <Box p={2} width='250px' role='presentation' textAlign='center'>
                            <Typography variant='h6' component='div'>
                                Categorias
                            </Typography>
                        </Box>
                    </Drawer>
                </div>


                <div className={styles.navbar_logo}>
                    <img src={Logo} alt="" />
                    <h2>SHOP LOCAL</h2>
                </div>

                <div >
                    {authenticated ?
                        <div >
                            <UserPanel />

                        </div> :
                        <div className={styles.loginBox}>
                            <button onClick={handleOpenLogin}>Login</button>
                            <LoginForm handleClose={handleCloseLogin} open={openLogin} />
                            <button onClick={handleOpenRegister}>Cadastrar</button>
                            <RegisterForm handleClose={handleCloseRegister} open={openRegister} saller={false} />
                        </div>
                    }
                </div>

            </nav>
        </navbar >

    )
}