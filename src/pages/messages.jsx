
import { useLoaderData, useLocation, useSearchParams} from "react-router-dom"
import MessageCard from "../components/Card/messageCard"
import { httpRequest } from "../service/httpRequest"
import { useEffect,useRef } from "react"
import { Toast } from "primereact/toast";

export default function Messages(){
        const {messages} = useLoaderData()
        const {pathname} = useLocation()
        const toast = useRef()
        const [searchParams] = useSearchParams()
        console.log("seacrhParams : ",searchParams.mode)
        console.log("pathname : ",pathname)

        useEffect(() => {
              if(searchParams !== undefined && searchParams.get("mode") !== undefined && searchParams.get("mode") === "delete" ) 
              {
                toast.current.show({severity:'success', summary: 'Success', detail:'Message have successfully  delete', life: 2000})
              }
        },[searchParams])

        return <div className="p-0 m-0 md:mx-8 md:px-8 md:pt-4">
                      <ul className="flex flex-column m-0 p-0 md:mx-8 ">
                    {messages.map((message,index) => {
                         return <MessageCard key={index} {...message} url={`${pathname}/${message.id}`} backPath={pathname}/>
                    })}
                 </ul>
                         <Toast ref={toast} position="bottom-center"/>
               </div>
} 

export async function loaderForMessages(){

     const response =await httpRequest({path:"api/messages",addToken:true})
     if(response.state !== "ok")
     {
       return response
     }
     console.log("messages loader : ",response)
     return response
}

