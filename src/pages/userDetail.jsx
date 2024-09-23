import {redirect, useActionData, useLoaderData, useParams, useSubmit } from "react-router-dom"
import { httpRequest } from "../service/httpRequest";
import { Toast } from "primereact/toast";
import UserDetailForm from "../components/Forms/userDetailForm";
import { useEffect, useRef } from "react";
import { userFormCheck } from "../utils/checkUtils";
import { convertBase64 } from "../utils/converterUtils";
export default function UserDetail(){
   const submit = useSubmit()
   const {id} = useParams()
   const actionData = useActionData()
   const data = useLoaderData()
   const toast = useRef()
   useEffect(() => {
      console.log("user detail action detail  : ",actionData)
                   if(actionData !== undefined && data.state === "error")
                   {
                    toast.current.show({severity:'error', summary: 'Error', detail:data.error, life: 3000})
                   }
                   else if (actionData !== undefined && data.state === "ok")
                   {
                     toast.current.show({severity:'success', summary: 'Success', detail:"User have successfully added in", life: 3000})
                   }
     },[actionData])

    const handleOnSubmit =(e) => {
              e.preventDefault()
              const formObj = new FormData(e.target)
              if(id !== "-1")
              {
                formObj.append("username",data.data.username)
              }
              const file = formObj.get("base64Photo")
              if(file.size !== 0)
              {
               convertBase64(file,(base64) => { 
                formObj.set("base64Photo",base64) 
                const formData = formObj.entries()
                const data = Object.fromEntries(formData)
                console.log("new user datas : ",data)
                  submit(data,{method:"POST"})
              })
              }
              else{
               formObj.set("base64Photo"," ") 
               const formData = formObj.entries()
               const data = Object.fromEntries(formData)
               console.log("new user datas : ",data)
                 submit(data,{method:"POST"})   
              }
    }

   return <div className='w-full  h-full p-0 md:px-8 '>
 <div className='flex flex-column justify-content-center align-items-center w-full h-full  p-0 '>      
     <div className=' w-full md:w-6 p-0'>
     <h2 className='text-center text-white'>{data.mode}</h2>     
          <UserDetailForm initData={data.data} handleSubmit={handleOnSubmit} data={actionData} mode={id} />
     </div>
          </div>
            <Toast  position='bottom-center'/>              
           </div>
}

  export async function loaderForUserDetail({params}){
                  const {id} = params;
                   if(id !== "-1")
                   {
                    console.log(" id : ",id)
                    const response = await httpRequest({path:"api/user/"+id,addToken:true}) 
                    console.log("update user  response ",response)
                        if(response.state !== "ok")
                        {
                            return response
                        }
                           return {mode:"UPDATE USER FORM",data:{...response.user}}
                   }
                   else{
                      return {mode:"ADD USER FORM",data:{username:"",role:"reader",password:"",base64Photo:" "}}
                   }
                   
  }

  export async function actionUserDetail({params,request}){
   console.log("action for user detail run : ")
        const {id} = params;
        let path = "api/user/"
        const formData = await request.formData()
        const data = {
              username : formData.get("username"),
              password : formData.get("password"),
              base64Photo : formData.get("base64Photo")
        }
        console.log("action for user detail data : ",data)
        if(Number(id) === -1)
        {
           path += "add-reader"
        }
        else{
           path += "update/"+""+id
        }
        console.log("action for user detail path : ",path)
         const response = await httpRequest({path,method:"POST",addToken:true,addBody:true,bodyData:data,validFunction:() => userFormCheck(data.username,data.password,data.base64Photo)})
         console.log("action for user detail response : ",response)
         if(response.state !== "ok")
         {
             console.log("!== ok response : ",response)
             return response
         }
         console.log("add/update : ",response)
            return redirect("..")
         
  }