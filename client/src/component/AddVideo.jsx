

// import React, { useState, useRef } from 'react';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { useForm } from 'react-hook-form';
// import { FileUpload } from 'primereact/fileupload';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import { useCreateLessonVideoMutation } from '../app/videoApiSlice';
// import { useNavigate } from 'react-router-dom';

// export default function AddVideo() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [moveList, setMoveList] = useState(false);
//     const navigate = useNavigate();
//     const toast = useRef(null);
//     const [uploadVideo, { isError, isSuccess, error }] = useCreateLessonVideoMutation();

//     const { control, handleSubmit, reset } = useForm({
//         defaultValues: {
//             name: '',
//             role: '',
//             path: ''
//         }
//     });

//     const customUpload = async ({ files }) => {
//         const file = files[0];
//         setSelectedFile(file);

//         const formData = new FormData();
//         formData.append('name', "Video-" + Math.round(Math.random() * 100));
//         formData.append('role', "refresh");
//         formData.append('path', file);

//         try {
//             const response = await uploadVideo(formData).unwrap();
//             console.log('Upload response:', response);
//             toast.current.show({ severity: 'success', summary: 'Success', detail: 'Video uploaded successfully' });
//             reset();
//             setSelectedFile(null); // Clear the selected file after upload
//             setMoveList(true);
//         } catch (uploadError) {
//             console.error('Upload error:', uploadError);
//             toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload video' });
//         }
//     };

//     // if (moveList) {
//     //     // navigate("/videoList");
//     //     // return null;
//     //     console.log("aaaaaaaa");
//     // }

//     return (
//         <div className="p-fluid p-grid p-formgrid">
//             <Toast ref={toast} />
//             <div className="p-field p-col-12">
//                 <FileUpload 
//                     name="path" 
//                     customUpload 
//                     accept="video/mp4"
//                     uploadHandler={customUpload}
//                     auto
//                     mode='basic'
//                     multiple={false}
//                     onUpload={e => setUploadProgress(100)}
//                     onProgress={e => setUploadProgress(Math.round((e.loaded / e.total) * 100))}
//                     style={{marginLeft:"70%",marginTop:'5%',fontSize:'20px'}}
//                 />
//             </div>
//             {selectedFile && (
//                 <div className="p-field p-col-12">
//                     <video width="640" height="360" controls>
//                         <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                     <div>
//                     {!moveList&&<ProgressSpinner />}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useState, useRef, useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useForm } from 'react-hook-form';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useCreateLessonVideoMutation } from '../app/videoApiSlice';
import { useNavigate } from 'react-router-dom';

export default function AddVideo() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [moveList, setMoveList] = useState(false);
    const navigate = useNavigate();
    const toast = useRef(null);
    const [uploadAudio, { isError, isSuccess, error }] = useCreateLessonVideoMutation();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            role: '',
            path: ''
        }
    });

    useEffect(() => {
        if (moveList) {
            navigate("/videoList");
        }
    }, [moveList, navigate]);

    const customUpload = async ({ files }) => {
        const file = files[0];
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('name', "Audio-" + Math.round(Math.random() * 100));
        formData.append('role', "refresh");
        formData.append('path', file);

        try {
            const response = await uploadAudio(formData).unwrap();
            console.log('Upload response:', response);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Audio uploaded successfully' });
            reset();
            setSelectedFile(null); // Clear the selected file after upload
            setMoveList(true);
        } catch (uploadError) {
            console.error('Upload error:', uploadError);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload audio' });
        }
    };

    return (
        <div className="p-fluid p-grid p-formgrid">
            <Toast ref={toast} />
            <div className="p-field p-col-12">
                <FileUpload 
                    name="path" 
                    customUpload 
                    accept="video/mp4"
                    uploadHandler={customUpload}
                    auto
                    mode='basic'
                    multiple={false}
                    onUpload={e => setUploadProgress(100)}
                    onProgress={e => setUploadProgress(Math.round((e.loaded / e.total) * 100))}
                    style={{marginLeft:"70%",marginTop:'5%',fontSize:'20px'}}
                />
            </div>
            {selectedFile && (
                <div className="p-field p-col-12">
                    <audio controls>
                        <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                        Your browser does not support the audio element.
                    </audio>
                    <div>
                    {!moveList && <ProgressSpinner />}
                    </div>
                </div>
            )}
        </div>
    );
}
