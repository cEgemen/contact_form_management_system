import { Button } from 'primereact/button';
import {useActionData, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import { homeCheck } from "../utils/checkUtils"
import HomeContactForm from '../components/Forms/homeContactForm';
import { httpRequest } from '../service/httpRequest';
import { Toast } from 'primereact/toast';
import { useRef,useEffect } from 'react';
export default () => {
     const {countries} = useLoaderData()      
     const actionData = useActionData()  
     const toast = useRef()
     const submit = useSubmit()
     const navigate = useNavigate()
      
     const handleNavigate = () => {
           navigate("/login")
     }

     const handleSubmit = (event) => {
           event.preventDefault()
           submit(event.target)
     }
     
     useEffect(()=> {
          if(actionData !== undefined && actionData.state === "ok")
          { 
               toast.current.show({severity:'success', summary: 'Success', detail:'You have successfully send message', life: 2000})
          }
          else if(actionData !== undefined && actionData.state === "error")
          {
               toast.current.show({severity:'error', summary: 'Error', detail:actionData.error, life: 2000})
          }
    },[actionData])

     return <>
                         <div className="h-full">
                                <div className='grid h-full m-0'>
                                         <div className='col-12 md:col-6 p-0 md:px-5 flex flex-column md:flex-row justify-content-center align-items-center'>
                                             <div className='grid'>
                                                  <div className='col-4 '>
                                                      <h1 className='text-white'>MESSAGE<br/> AND <br/> REACH <br/> PEOPLE</h1>
                                                  </div>
                                                   <div className='col-8 pl-4 md:pl-6  flex flex-column justify-content-center align-items-center' >
                                                     <p className='text-white' >
                                                    You can send your messages. Other users can see, read or delete your messages. If you are a reader and you log in, you can do many different things.
                                                    </p>
                                                    <Button label='Login' className='border-round-lg' onClick={handleNavigate}/>
                                                   </div> 
                                             </div>
                                         </div>
                                         <div className='col-12 md:col-6 p-0 md:px-5 flex flex-column md:flex-row justify-content-center align-items-center'>
                                                  <div className='w-full '>
                                                        <h3 className='text-center text-white'>Message Form</h3>
                                                        <HomeContactForm handleSubmit={handleSubmit} countries={countries} data={actionData} />
                                                  </div>
                                                  
                                         </div>
                                </div>
                         </div>
                         <Toast ref={toast} position="bottom-center"/>
                         </>

}

export async function loaderForHome () {
     
     const url  = "http://localhost:5165/api/countries"
     const response =  await httpRequest({path:"api/countries"})
      if(response.state === "ok")
      {
           return response
      }
      console.log("countries : ",response.countries)
     return response
}

export async function actionForHome({params,request}) {
   
     const formData =await request.formData()
     const data = {
         name : formData.get("userName"),
         gender: formData.get("gender"),
         country : formData.get("country"),
         message : formData.get("message")
     }
      const response = await httpRequest({path:"api/message/add",method:"POST",addBody:true,bodyData:data,validFunction:() =>  homeCheck(data.name,data.message)})
     if(response.state !== "ok")
        {
          return response
        }   
       console.log("response : ",response)
       return response
     }