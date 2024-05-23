// import { useGetVideoByNameMutation ,useGetVideoByRoleQuery} from '../app/videoApiSlice';
// import React, { useEffect, useState } from "react";

// const ShowAudio = (props) => {
//     let fileName = props.path.split("\\");
//     fileName = fileName[fileName.length - 1];
    
//     // const [getAudio, { data, isError, isSuccess, error }] = useGetVideoByNameMutation();
//     const [getVideo, { data, isError, isSuccess, error }] = useGetVideoByRoleQuery();
//     // מניעת תפריט קליק ימני על הקובץ
//     const preventContextMenu = (event) => {
//         event.preventDefault();
//     };

//     useEffect(() => {
//         getAudio({ fileName });
//         console.log(data);
//     }, [fileName, getAudio]);

//     return (
//         <div>
//             {isSuccess && console.log("Audio fetched successfully")}
//             {isError && console.log("Error fetching audio")}
//             <audio
//                 controls 
//                 controlsList="nodownload" 
//                 onContextMenu={preventContextMenu}
//             >
//                 <source src={`http://localhost:1260/upload/${fileName}`} type="audio/mp4" />
//                 Your browser does not support the audio element.
//             </audio>
//         </div>
//     );
// };

// export default ShowAudio;
import { useGetVideoByRoleMutation } from '../app/videoApiSlice';
import React, { useEffect, useState } from "react";

const ShowVideo = (props) => {
    // קבלת ה-ROLE מ-localStorage
    const role = localStorage.getItem("role");

    // קריאה לפונקציה getVideo עם role
    const [getVideo,{ data, isError, isSuccess, error }] = useGetVideoByRoleMutation();
    
    // מניעת תפריט קליק ימני על הקובץ
    const preventContextMenu = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        console.log(data);
        getVideo(role)
    }, [data,role]);

    return (
        <div>
            {isSuccess && console.log("Video fetched successfully")}
            {isError && console.log("Error fetching video")}
            <video
                controls 
                controlsList="nodownload" 
                onContextMenu={preventContextMenu}
            >
                <source src={`http://localhost:1260/upload/${data?.fileName}`} type="video/mp4" />
                Your browser does not support the video element.
            </video>
        </div>
    );
};

export default ShowVideo;
