
// import { useEffect, useState } from 'react';
// import { useUpdateDialogMutation } from '../app/dialogApiSlice';
// import { InputText } from "primereact/inputtext";
// import DecodeToken from '../DecodeToken';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useRefetch } from '../context/refetchContext';
// import RefreshDialoge from '../component/RefreshDialoge';

// const ShowDialogue = () => {
//     const location = useLocation();
//     const { dialogue } = location.state || {};
//     const refetch = useRefetch();
//     const navigate = useNavigate();

//     const [UpdateDialogue, { isLoading }] = useUpdateDialogMutation();
//     const [buttonValue, setButtonValue] = useState('');
//     const [refreshNeeded, setRefreshNeeded] = useState(false);

//     const sendMessage = async () => {
//         const id = dialogue._id;
//         const { _id } = DecodeToken();
//         const obj = { id, message: { message: buttonValue, userId: _id } };
//         // refetch
//         try {
//             await UpdateDialogue(obj);
//             setButtonValue('');
//             setRefreshNeeded(true); // לסמן שצריך לרענן
//         } catch (error) {
//             console.error('Failed to update dialogue:',error);
//         }
//     }

//     useEffect(() => {
//         if (refreshNeeded && !isLoading) {
//             setRefreshNeeded(false);
//             navigate("/ShowDialogue", { state: { dialogue } });
//         }
//     }, [refreshNeeded, isLoading, navigate, dialogue]);

//     return (
//         <div style={{ marginRight: '100%', width: '300px' }}>
//             {dialogue && dialogue.dialogue.map((element, index) => (
//                 <InputText key={index} value={element.message} readOnly />
//             ))}
//             <InputText
//                 value={buttonValue}
//                 onChange={(e) => setButtonValue(e.target.value)}
//                 dir='rtl'
//                 placeholder='תגובה'
//             />
//             <button onClick={sendMessage}>שלח</button>
//         </div>
//     );
// }

// export default ShowDialogue;

// // // src/components/ShowDialogue.js
// import { useEffect, useState } from 'react';
// import { useUpdateDialogMutation } from '../app/dialogApiSlice';
// import { InputText } from "primereact/inputtext";
// import DecodeToken from '../DecodeToken';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useRefetch } from '../context/RefetchContextD';
// import RefreshDialoge from '../component/RefreshDialoge';

// const ShowDialogue = () => {
//     const location = useLocation();
//     const { dialogue } = location.state || {};
//     const refetch = useRefetch();
//     const navigate = useNavigate();

//     const [UpdateDialogue, { isLoading }] = useUpdateDialogMutation();
//     const [buttonValue, setButtonValue] = useState('');
//     const [refreshNeeded, setRefreshNeeded] = useState(false);

//     const sendMessage = async () => {
//         const id = dialogue._id;
//         const { _id } = DecodeToken();
//         const obj = { id, message: { message: buttonValue, userId: _id } };
//         try {
//             await UpdateDialogue(obj).unwrap();
//             setButtonValue('');
//             setRefreshNeeded(true);
//             refetch(); // קריאה ל-refetch לאחר עדכון ההודעה
//         } catch (error) {
//             console.error('Failed to update dialogue:', error);
//         }
//     }

//     useEffect(() => {
//         if (refreshNeeded && !isLoading) {
//             setRefreshNeeded(false);
//             navigate("/ShowDialogue", { state: { dialogue } });
//         }
//     }, [refreshNeeded, isLoading, navigate, dialogue]);

//     return (
//         <div style={{ marginRight: '100%', width: '300px' }}>
//             {dialogue && dialogue.dialogue.map((element, index) => (
//                 <InputText key={index} value={element.message} readOnly />
//             ))}
//             <InputText
//                 value={buttonValue}
//                 onChange={(e) => setButtonValue(e.target.value)}
//                 dir='rtl'
//                 placeholder='תגובה'
//             />
//             <button onClick={sendMessage}>שלח</button>
//         </div>
//     );
// }

// export default ShowDialogue;
import { useEffect, useState } from 'react'
import { useGetDialogsByIdQuery, useUpdateDialogMutation } from '../app/dialogApiSlice'
import { InputText } from "primereact/inputtext";
import DecodeToken from '../DecodeToken'
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { render } from 'react-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { useDispatch } from 'react-redux';
import Discussions from './Discussions'


const ShowDialogue = () => {
    const location = useLocation()
 
    const { dialogue,name } = location.state||{}
    const [dialogueData,setDialogueData]=useState(dialogue?.dialogue)
    
    const navigate=useNavigate()
    const [UpdateDialogue, {  isSuccess, error, isLoading, data }] = useUpdateDialogMutation()
    const {isError,data:data1,isSuccess:isSuccess1,refetch}=useGetDialogsByIdQuery(dialogue._id)

    const [buttonValue, setButtonValue] = useState('')
    // console.log(refetch);
    const sendMessage =  () => {
        const id = dialogue._id
        const { _id } = DecodeToken()
        const obj = { id, message: { message: buttonValue, userId: _id } }
        console.log("sendMessage",buttonValue,obj);
        
        UpdateDialogue(obj)
        
        refetch(id)
        setButtonValue("")
    }
    useEffect(()=>{
        if(isSuccess1)
        {setDialogueData(data1[0]?.dialogue)}
    },[data1])
    useEffect(()=>{
        if(isSuccess)
        {console.log("data",data);
        // navigate('/dialogue',{state:{refe:'true',dialogue:data}})
        // navigate('/UsersDialogue',{state:{refe:'true',dialogue:data}})
}
    },[isSuccess])
    return (
        
        <div style={{ width: '100%', alignItems: 'center' }}>
        <br /><br /><br />
     
    {dialogueData?.map(element=> <div><InputText value={element.message} style={{marginTop:"10px",width:'200px',height:'30px',borderRadius:'10px'}}/></div>)}
    <br/>
    <InputText value={buttonValue} onChange={(e) => setButtonValue(e.target.value)} dir='rtl' placeholder='תגובה' />
    <button onClick={()=>sendMessage()}>שלח</button>
    </div>
    )



}
export default ShowDialogue
