import { useContext, useState } from "react"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


import "./LoginForm.css"

//*context
import { Context } from '../../context/UserContext'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
};




const RegisterForm = ({ handleClose, open, saller }) => {

    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function hancleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSumit(e) {
        e.preventDefault()

        //? send the user to db
        register(user)
    }



    return (
        <div>

            <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{
                backdrop: { timeout: 500, }
            }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <div class="content">
                            <form class="form_main" onSubmit={handleSumit}>
                                <p class="heading">Cadastrar</p>

                                <div class="inputContainer">
                                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" class="inputIcon" />
                                    <input placeholder="E-mail" id="email" name="email" class="inputField" type="email" onChange={hancleChange} />
                                </div>

                                <div class="inputContainer">
                                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" class="inputIcon" />
                                    <input placeholder="Nome" id="name" name="name" class="inputField" type="text" onChange={hancleChange} />
                                </div>

                                <div class="inputContainer">
                                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" class="inputIcon" />
                                    <input placeholder="Telefone" id="phone" name="phone" class="inputField" type="text" onChange={hancleChange} />
                                </div>

                                <div class="inputContainer">
                                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" class="inputIcon" />
                                    <input placeholder="Senha" id="password" name="password" class="inputField" type="password" onChange={hancleChange} />
                                </div>

                                <div class="inputContainer">
                                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" class="inputIcon" />
                                    <input placeholder="Confirmaçao de senha" id="confirmpassoword" name="confirmpassoword" class="inputField" type="password" onChange={hancleChange} />
                                </div>

                                <input  id="saller" name="saller" class="inputField" type="hidden" value={saller} onChange={hancleChange} />


                                <input className="submit" type="submit" value="Cadastrar" />
                            </form>

                        </div>

                    </Box>
                </Fade>
            </Modal>
        </div >
    )
}

export default RegisterForm