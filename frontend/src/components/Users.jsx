import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "./Button"


export const Users = () => {

    const [user,setUser] = useState([])
    const [filter,setFilter] = useState("");

    useEffect(()=> {
        axios.get("https://localhost:3000/api/vi/user/bulk?filter=" + filter)
        .then(response => {
            setUser(response.data.user)
        })
    }, [filter])


    return <div >
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div>
            <div className="my-2 ">
                <input onChange={(e) => {setFilter(e.target.value)}} placeholder="Searchingg..." type="text" className="w-full px-2 py-1 border rounder border-slate-300" />
            </div>
            <div>
                {user.map(user => <User user = {user}/>)} 
            </div>
        </div>
    </div>

}



const User = ({user}) => {
    const navigate = useNavigate()

    return <div className="flex justify-between">
        <div className="flex">
            <div className="flex justify-center rounder-full h-12 w-12 bg-slate-200 mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick = { (e) =>{
                navigate('/send?id=' + user._id + "&name" + user.firstName) 
            }}  label={"Send Money"} />
        </div>
    </div>
}