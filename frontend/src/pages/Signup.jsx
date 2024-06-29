import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {HeadElement} from './../components/HeadElement'
import {BelowHeaderElement} from './../components/BelowHeaderElement'
import {InputItem} from './../components/InputItem'
import {BottomWarning} from './../components/BottomWarning'
import  {Button} from './../components/Button'
import axios from 'axios';



export const Signup = () => {
    
   
    //state variables
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setpassWord] = useState("")
    const [username, setUsername ] = useState("")
    const navigate  = useNavigate();


    return <div className="flex justify-center h-screen bg-slate-300">
        <div className="flex flex-col justify-center ">
        <div className=" bg-white w-80 h-max text-center p-2 px-4">
            <HeadElement label = {'Sign up'} /> 
            <BelowHeaderElement label = {'Enter you info to create an account'} />
            <InputItem label = 'First Namse' placeholder = 'Rushabh' onChange= { (e) => {
                setFirstName(e.target.value)
            }} />
            <InputItem label = 'Last Name' placeholder = 'Poojara' onChange = { (e) => {
                setLastName(e.target.value)
            }} />
             <InputItem label = 'Email' placeholder = 'rushabh3@gmail.com' onChange = { (e) => {
                setUsername(e.target.value)
            }} />
            <InputItem label = 'Password' placeholder = '123456' onChange = { (e) => {
                setpassWord(e.target.value)
            }} />    
            <div>
                
            <Button onClick={async () => {

                try {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstName,
                    lastName,
                    password
                    });
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                } catch (error) {
                    console.error('There was an error!', error.response);
                }
          }} label={"Sign up"} />
            </div>
            <BottomWarning label= {"Already have account?"} buttontext= {"Sign in"} to= {"/signin"} />
        </div>
    </div>
</div>
}