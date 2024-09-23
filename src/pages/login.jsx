
import {useActionData ,useNavigate,useSubmit} from 'react-router-dom';
import { loginCheck } from "../utils/checkUtils"
import LoginForm from '../components/Forms/loginForm';
import { saveToken } from '../utils/localStrg';
import { useDispatch } from 'react-redux';
import { actions } from '../management/reducers/user';
import { useEffect, useRef } from 'react';
import { httpRequest } from '../service/httpRequest';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';
export default () => {
console.log("login run")
const data = useActionData()
const toast = useRef()
const navigate = useNavigate()
const dispatch = useDispatch()
 useEffect(() => {
   if(data?.id !== undefined)
   {   
           navigate("/user/"+data.role+"?mode=login")  
           dispatch(actions.addUserInformation({...data,image:data.base64Photo}))    
    } 
 },[data,dispatch])
 useEffect(() => {
  console.log("data : ",data)
               if(data !== undefined && data.state === "error")
               {
                toast.current.show({severity:'error', summary: 'Error', detail:data.error, life: 3000})
               }
 },[data])
 const submit = useSubmit()
 const handleSubmit = (event) => {
        console.log("handle submit")
        event.preventDefault()
        submit(event.target)
 }

 const handleBackHome =() => {
        navigate("/")
 }

 const handleToast = () => {
       toast.current.show({severity:'warn', summary: 'Warn', detail:'You must log in to access your profile.', life: 4000})
 }
  
 return <>
                <div className='w-full  h-full p-0 md:p-5 '>
                                     <div className=' flex justify-content-between'>
                                          <Avatar icon="pi pi-home" shape='circle' onClick={handleBackHome}/>
                                          <Avatar icon="pi pi-user" shape='circle' onClick={handleToast}/>
                                       </div>
                                  <div className='flex flex-column justify-content-center align-items-center w-full h-full  p-0 '>      
                                        <div className=' w-full md:w-6 p-0'>
                                        <h2 className='text-center text-white'>User Login</h2>
                                        <p className='text-center text-white'>Welcome back. Login to access exclusive content. </p>
                                        <LoginForm handleSubmit={handleSubmit} data={data} />
                                        </div>
                                        </div>
                                   <Toast ref={toast} position='bottom-center'/>              
               </div>
           
                                           
       </>
}

export const actionForLogin = async ({params,request}) => {
             console.log("login action run")
            const path = "api/user/login"
            const method = request.method;
            const formData =await request.formData()
            const data = {
                username : formData.get("username"),
                password: formData.get("password")
            }
         const result  =  await httpRequest({path,method,addBody:true,bodyData:data,validFunction:() => loginCheck(data.username,data.password),onCompletedfetch:(data) => saveToken(data.token)})
         console.log("login result : ",result)
         if(result.state !== "ok")
         {
          return result
         }
         return result.user 
        
}                                        