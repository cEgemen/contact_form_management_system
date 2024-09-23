import {useLoaderData, useSubmit,useLocation, redirect, useActionData } from "react-router-dom";
import { httpRequest } from "../service/httpRequest";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageDetailCard from "../components/Card/messageDetailCard";
import { Toast } from "primereact/toast";
export default function MessageDetail (){
       const {userData} = useSelector(state => state.user)
       const {message} = useLoaderData()
       const {pathname} = useLocation()
       const  actionData = useActionData()
       const toast = useRef()
       console.log("message detail pathName : ",pathname)
       const submit = useSubmit()
       console.log("message : ",message)
       useEffect(() => {
         if(message.read !== "true")
            {
             submit(null,{method:"PATCH",action:pathname})
            }
       },[])
       useEffect(() => {
           console.log("useffecct data  :  ",actionData)
           if(actionData !== undefined  && actionData.message.read !== undefined &&  actionData.message.read === "true")
           {
            toast.current.show({severity:'success', summary: 'Success', detail:'Message have successfully  marked read', life: 2000})
           }    
       },[actionData]) 
       
       return <>
                  <div className="p-0 m-0 md:mx-8 md:px-8 md:pt-4 h-full">
                     <MessageDetailCard {...message} role={userData.role} onMutate={({method}) => {
                               submit(null,{method,action:pathname})
                     }}/>
                 </div>  
                 <Toast ref={toast} position="bottom-center"/>
              </>
}

export async function loaderForMessageDetail({params}){
        const {id} = params;
        const response = await httpRequest({path:`api/message/${id}`,addToken:true})
        if(response.state !== "ok")
        {
           return response
        }
        console.log("detail loader : ",response)
        return response
}

export async function actionForMessageDetail({params,request}){
    const currentUrl = request.url.split("/")
    const backPath = currentUrl.slice(3,currentUrl.length - 1).join("/")
    const {id} = params
    const  method = request.method
    let path = "api/message/"
    if(method === "DELETE")
    {
        path +="delete/"+id
    }
    else{
       path +="read/"+id
    }
    console.log("message detail action path : ",path)
    const response = await httpRequest({path,method:"POST",addToken:true})
      if(response.state !== "ok")
    {
       return response
    } 
       console.log("detail message : ",response.message)
       if(method === "DELETE")
       {
         return redirect(`/${backPath}?mode=delete`)
       }
       return response
}