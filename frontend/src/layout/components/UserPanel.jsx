import { useEffect, useContext, useState } from 'react'
import { deepOrange, red } from '@mui/material/colors';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

import style from './UserPanel.module.css'


//?utils
import api from '../../utils/api';

//? context
import { Context } from "../../context/UserContext"
import { Avatar, Icon } from '@mui/material'

export default function UserPanel() {

    const { logout, user } = useContext(Context)

    return (
        <div>
            <div className={style.container}>
                <Avatar sx={{ width: 30, height: 30, bgcolor: deepOrange[500] }} alt="Remy Sharp" src={user.image === "" ? user.name.substr(1) : `http://localhost:5000/images/user/${user.image}`} >  {user.image === "" ? user.name.substr(0, 1) : ""}</Avatar>
                <h3>{user.name}</h3>
            </div>
            <div className={style.container}>


                <a >perfil</a>
                <a onClick={logout}>Sair</a>
            </div>

        </div>

    )
}