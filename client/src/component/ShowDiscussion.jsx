import { useEffect, useState } from 'react'
import { useUpdateDiscussionMutation,useGetDiscussionByNameQuery } from '../app/discussionApiSlice'
import { InputText } from "primereact/inputtext";
import DecodeToken from '../DecodeToken'
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { render } from 'react-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { useDispatch } from 'react-redux';
import Discussions from './Discussions'


const ShowDiscussion = () => {
    const location = useLocation()
 
    const { discussion,name } = location.state||{}
    
    
    const navigate=useNavigate()
    const [updateDiscussion, { isError, isSuccess, error, isLoading, data }] = useUpdateDiscussionMutation()

    const [buttonValue, setButtonValue] = useState('')
    // console.log(refetch);
    const sendMessage =  () => {
        const id = discussion._id
        const { _id,name } = DecodeToken()
        
        const obj = { id, message: { message: buttonValue, userId: _id } }
         updateDiscussion(obj)
        setButtonValue("")
        // render(<Discussions/>)

        // refetch()
    }
    useEffect(()=>{
        if(isSuccess)
        {console.log("data",data);
        navigate('/discussions',{state:{refe:'true',discussion:data}})
}
    },[isSuccess])
    return (
        
        //     {discussion?.discussion?.map(element => <div style={{ borderColor: 'white' }}><InputTextarea autoResize value={`${element.name}\n${element.message}`} style={{ direction: 'rtl', width: '80%' }} ></InputTextarea ></div>)}
       
        //     <InputText value={buttonValue} onChange={(e) => setButtonValue(e.target.value)} dir='rtl' placeholder='תגובה' />
        //     <button onClick={() => sendMessage()}>שלח</button>
       
        <div style={{ width: '100%', alignItems: 'center' }}>
        <br /><br /><br />
     
    {discussion.discussion.map(element=> <div><InputText value={element.message+" "+element.userId} style={{marginTop:"10px",width:'200px',height:'30px',borderRadius:'10px'}}/></div>)}
    <br/>
    <InputText value={buttonValue} onChange={(e) => setButtonValue(e.target.value)} dir='rtl' placeholder='תגובה' />
    <button onClick={()=>sendMessage()}>שלח</button>
    </div>
    )



}
export default ShowDiscussion
