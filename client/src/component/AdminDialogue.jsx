// import { useGetPathByIdQuery } from '../app/videoApiSlice';
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import DecodeToken from '../DecodeToken'
// import {useGetDialogsQuery} from '../app/dialogApiSlice'
// import { Button } from 'primereact/button';
// import AddDialog from './AddDialog';
// import Dialogbutton from './Dialogbutton';
// import 'primeicons/primeicons.css';

// const AdminDialogue = (props) => {
//     const {roles}=DecodeToken()
//     const { data, isError, isSuccess, refetch } = useGetDialogsQuery(roles)

//     const navigate = useNavigate()
// const [add, setAdd]=useState(false)
//     const Request = async () => {
        
        
        
//         const ans = await axios("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"))

//         if (ans.data.ans == false) {

//             navigate("/login")
//         }
//     }
//     useEffect(() => {
//         Request();

//     }, [])


//     // const {roles} = DecodeToken()

//     // useEffect(() => {
//     //     if (roles == "admin") {
//     //         navigate("/personalAreaAdmin")
//     //     }
//     //     else {
//     //         navigate("/login")
//     //     }

//     // }, [roles])

//     return(
//         <div style={{marginLeft:'30%'}}>
   


//         <br/><br/>
//         {/* {add||<Button label='שליחת הודעה'  onClick={() =>{setAdd(true)}} />} */}
       
//         {add &&  <AddDialog refetch={refetch} role={roles}/>}
//         <br/><br/><br/>
//         {isSuccess && data.map(element=><Dialogbutton dialogue={element} refetch={refetch}/>)}
//         {/* {console.log(data[1])} */}
//         </div>
//             ) 
// }
// export default AdminDialogue

