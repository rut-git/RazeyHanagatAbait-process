// import React from 'react';
// import './Article.css'
// import { useGetVideoByRoleQuery,useGetVideoByNameMutation,useGetAllVideosQuery } from '../app/videoApiSlice'
// import ShowVideo from './ShowVideo'
// import { useEffect } from "react";
// import { Button } from 'primereact/button';

// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// export default function VideoList() {
//     const { data, isError, isSuccess,error } = useGetAllVideosQuery()
//     // const [update,{ data, isError, isSuccess }] = useGetVideoByNameMutation()

//     const navigate = useNavigate()

//     const Request = async () => {
       
//         const ans = await axios("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"))
        
//         if (ans.data.ans == false) {

//             navigate("/login")
//         }
//     }
//     useEffect(() => {
//          Request();
        
// }, [])
//     return (

//         <div>
        
//     {console.log( localStorage.getItem("role"))}
//             <Button onClick={()=>navigate('../addVideo')}>add video</Button>
// {isError && console.log(error)}
//             {isSuccess && console.log(data)}
//                 {isSuccess && data.map(element => 
//                     <ShowVideo path={element.path}/>
//                 )
//                 }
              
//         </div>
//     )
// // }
// import React, { useEffect, useState } from 'react';
// import './Article.css'
// import ShowAudio from './ShowVideo'
// import { Button } from 'primereact/button';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function VideoList() {
//     const [videos, setVideos] = useState([]);
//     const [error, setError] = useState(null);
//     const [userRole, setUserRole] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const checkPermissions = async () => {
//             try {
//                 const response = await axios.get("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"));
//                 if (response.data.ans) {
//                     setUserRole(localStorage.getItem("role"));
//                 } else {
//                     navigate("/login");
//                 }
//             } catch (error) {
//                 console.error("Error checking permissions:", error);
//             }
//         };
//         checkPermissions();
//     }, [navigate]);

//     useEffect(() => {
//         const fetchVideos = async () => {
//             try {
//                 const response = await axios.get("http://localhost:1260/upload/${fileName(element)}"); // ודא ש-URL זה נכון
//                 setVideos(response.data);
//                 console.log('Fetched videos:', response.data); // קוד דיבוג להצגת הוידאו שהתקבל
//             } catch (error) {
//                 setError(error);
//                 console.error('Error fetching videos:', error); // קוד דיבוג להצגת שגיאות בשליפת הוידאו
//             }
//         };
//         fetchVideos();
//     }, []);

//     const handleAddVideoClick = () => {
//         if (userRole === "admin" || userRole === "secretary") {
//             navigate('../addVideo');
//         } else {
//             // Handle unauthorized user
//             alert("You don't have permission to add videos.");
//         }
//     }

//     return (
//         <div>
//             <br />
//             {userRole && (userRole === "admin" || userRole === "secretary") && (
//                 <Button onClick={handleAddVideoClick}>Add Video</Button>
//             )}
//             {error && <p>Error fetching videos: {error.message}</p>}
//             {videos.length > 0 ? (
//                 console.log("aaaaaaa")
//                 // videos.map((element, index) => (
//                 //     <ShowAudio key={index} path={element.path} />
//                 // ))
//             ) : (
//                 <p>No videos available.</p>
//             )}
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import './Article.css'
import { useGetAllVideosQuery } from '../app/videoApiSlice'
import ShowVideo from './ShowVideo'
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VideoList() {
    const { data, isError, isSuccess, error } = useGetAllVideosQuery()
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const checkPermissions = async () => {
            try {
                const response = await axios.get("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"));
                if (response.data.ans) {
                    setUserRole(localStorage.getItem("role"));
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error checking permissions:", error);
            }
        }
        checkPermissions();
    }, [navigate]);

    const handleAddVideoClick = () => {
        if (userRole === "admin" || userRole === "secretary") {
            navigate('../addVideo');
        } else {
            // Handle unauthorized user
            alert("You don't have permission to add videos.");
        }
    }
    const fileName=(element)=>{
        let fileName=element.path.split("\\")
        fileName=fileName[fileName.length-1];
        return fileName
    }
    return (
        <div>
            <br></br>
            {userRole && (userRole === "admin" || userRole === "secretary") && (
                <Button onClick={handleAddVideoClick}>Add Video</Button>
            )}
            {isError && console.log(error)}
            {isSuccess && console.log(data)}
            <div style={{display:"flex" ,flexWrap:"wrap"}}>
                {isSuccess && data.map(element => 
                    <video width="500" height="240" controls style={{flex:"33%"}}>
                    <source src={`http://localhost:1260/upload/${fileName(element)}`} type="video/mp4"/>
                </video>
                )
                }    
        </div></div>
    )
    
}
