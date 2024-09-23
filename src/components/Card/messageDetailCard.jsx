import { converToLocaleDateString } from "../../utils/converterUtils"
import CustomCard from "./customCard"
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import {useState } from "react";
import { Dialog } from "primereact/dialog";

export default function MessageDetailCard({name,country,message,creationDate,read,gender,role,onMutate}){
    const date = converToLocaleDateString(creationDate)
    const [isOpen,setIsOpen] = useState({visible:false,warn:false,info:false})    
    const handleDialog = () => {
          setIsOpen(oldState => {
              return {...oldState,visible:true,info:true}
          })
    }
    
    const handleDelete = () => {
          console.log("role : ",role)
          if(role === "reader")
          {
            setIsOpen(oldState => {
                return {...oldState,visible:true,warn:true}
            })
          }
          else{
              onMutate({method:"DELETE"})
          }
    }
     
    const headerDialog =(
        <>
         <div className='flex align-items-center gap-2 '>
        <Avatar icon="pi pi-globe" size="large" shape="circle" />
        <h4 className='m-0 p-0'>Information</h4>
          </div>
        </>
                        )

    const header = (
        <>
 <div className='flex align-items-center gap-2 '>
    <Avatar icon="pi pi-user" size="large" shape="circle" />
    <div>
    <h4 className='m-0 p-0 '>{name}</h4> 
    <h5 className='m-0 p-0 font-light'>{country}</h5>
    </div>
 </div>
  <div>
  <Avatar icon="pi pi-trash" shape="circle" onClick={() => {handleDelete()}}/>
  </div>
 
        </>
);

const main = (
    <>
               <div style={{minHeight:"40vh"}}>
                    {message}
               </div>
    </>
)

const footer = (
 <>
     <div>
       <Avatar icon="pi pi-info" shape="circle" className='bg-yellow-500 text-white' onClick={e => {handleDialog()}}/>    
     </div>
     <div>
     <h4 className='m-0 p-0 underline'>Date</h4> 
     <h5 className='m-0 p-0'>{date}</h5>
     </div>
 </>
);

  const content = isOpen.info ? `This message was sent by ${name} on ${date} and has ${read === "false" ? "not" : ""} been read before. ${name}'s gender is ${gender}, ${gender === "female" ? "she" : "he"} is in ${country}.` : "Only admin can use."
   console.log("isOpen : ",isOpen)
   return <>
              <div className="flex flex-column  h-full justify-content-center">
                <CustomCard  main={main} footer={footer} header={header}/>
              </div>
              <Dialog  header={headerDialog} visible={isOpen.visible} style={{ width:`${isOpen.info ? "50vw" : "25vw"}` }} onHide={() => setIsOpen(oldState => {
                  return {visible:false,warn:false,info:false}
              })}>
                   <>  
                    <p>
                          {content}
                    </p>
                   </>
             </Dialog>
         </>
}