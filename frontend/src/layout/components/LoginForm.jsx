import { useContext, useState } from "react"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

//*context
import { Context } from '../../context/UserContext'


import "./LoginForm.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
};



const LoginForm = ({ handleClose, open }) => {

    const [user, setUser] = useState({})
    const { login } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })

    }

    function handleSubmit(e) {
        e.preventDefault()

        login(user)
    }


    return (
        <div>

            <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{
                backdrop: { timeout: 500, }
            }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <div class="content">
                            <form class="form_main" onSubmit={handleSubmit}>
                                <p class="heading">Login</p>
                                <div class="inputContainer">
                                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" class="inputIcon" />

                                    <input placeholder="E-mail" name="email" id="email" class="inputField" type="text" onChange={handleChange} />
                                </div>

                                <div class="inputContainer">
                                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" class="inputIcon" />
                                    <input placeholder="Password" name="password" id="password" class="inputField" type="password" onChange={handleChange} />
                                </div>

                                <input className="submit" type="submit" value="Login" />
                            </form>

                        </div>

                    </Box>
                </Fade>
            </Modal>
        </div >
    )
}

export default LoginForm