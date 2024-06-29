import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";


import {HeadElement} from './../components/HeadElement'
import {BelowHeaderElement} from './../components/BelowHeaderElement'
import {InputItem} from './../components/InputItem'
import  {Button} from './../components/Button'
import {BottomWarning} from './../components/BottomWarning'


export const Signin = ()=>{


    const [Email,setEmail] = useState("")
    const [passWord,setPassWord] = useState("")


    return <div className="flex justify-center h-screen bg-slate-300">
        <div className="flex flex-col justify-center ">
            <div className=" bg-white w-80 h-max text-center p-2 px-4">
                <HeadElement label = {"Sign In"} />
                <BelowHeaderElement label = {"Enter your credentials to access your account"} />
                <InputItem label={"Email"} placeholder="rushabh@gmail.com" onChange={ (e) => {
                    setEmail(e.target.value)
                }} />
                <InputItem label={"Password"} placeholder="123456" onChange={ (e) => {
                    setPassWord(e.target.value)
                }} />               
                <div className="pt-4">
                    <Button label={'Sign in'} call = { async () => {
                    const response = await axios.post("https://localhost:3000/api/vi/user/signin", {
                        Email,
                        passWord
                })  
                    localStorage.setItem("token",response.data.token)
                    navigate("/dashboard")
                }} />
                </div>
                <BottomWarning label={"Don't have an account"} buttontext={"Sign up"} to={"/signup"} />

            </div>
        </div>

    </div>
}