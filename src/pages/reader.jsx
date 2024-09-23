import { Toast } from "primereact/toast"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Avatar } from "primereact/avatar"
import { UserRightSide } from "../components/Headers/userRightSide"
export default function Reader(){
    console.log("reader run")
    const {userData} = useSelector(state => state.user)
    console.log("reder userData : " ,userData)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const toast = useRef()
    useEffect(() => {
        if(searchParams.get("mode") === "login")
        toast.current.show({severity:'success', summary: 'Success', detail:'You have successfully logged in', life: 2000})
    },[])
    const handleNavigate = () => {
        navigate("/")
  } 

  const guides =[
    {icon:"pi pi-home",title:"Home",desc:"It allows you to go to the Reader Home page. You can also go to the home page of the website to send a message from there, but you may need to log in again when you come back."},
    {icon:"pi pi-envelope",title:"Messages",desc:"It goes to the Messages page. On the Message page, you can see the messages received in the system. You can also see the details of the messages."},
  ]

  return <>
            <div className="h-full">
                             <div className='grid h-full m-0'>
                                      <div className='col-12 md:col-6 p-0 md:pl-8 flex flex-column md:flex-row justify-content-center '>
                                          <div className="flex flex-column justify-content-center m-0 " >
                                                <h1 className='text-white text-center'>READER INFORMATION</h1>
                                                <div className='p-0 md:px-8 flex flex-column justify-content-center align-items-center' >
                                                  <p className='text-white' >
                                                  {userData.username}, welcome back to the reader page. You can perform operations on many data in the system and also access the details from the side. If you want to send a message, you can go to the home page, but you may need to log in to come to this page again.
                                                 </p>
                                                 <Avatar icon="pi pi-map" shape="circle"  onClick={handleNavigate}/>
                                                </div> 
                                          </div>
                                      </div>
                                      <div className='col-12 md:col-6 p-0 md:pr-8'>
                                       <div className="flex flex-column  h-full ">
                                       <h2 className='text-white p-0 md:px-5'>Guide</h2>
                                                { guides.map((guide,index) => {
                                                    return <UserRightSide key={index} {...guide} />
                                                 })}
                                       </div> 
                                      </div>
                             </div>
                      </div>
            <Toast ref={toast} position="bottom-center"/>
         </>
} 

