

import { Outlet, redirect, useSubmit} from "react-router-dom"
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from "react-router-dom";
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Divider } from 'primereact/divider';
import { Button } from "primereact/button";
import { cleanToken, getToken } from "../utils/localStrg";
import { httpRequest } from "../service/httpRequest";
export default function ReaderLayout(){
    const navigate = useNavigate()
    const submit = useSubmit()
    const overlayPanelRef = useRef()
    const {userData} = useSelector(state => state.user)
     
    const handleLogOut = () => {
          submit(null,{method:"POST"})
    } 

    const items = [
        { label: 'HOME', icon: 'pi pi-home',command:() => {
                   navigate("/user/reader?mode=return")
        } 
        },
        {
            label: 'MESSAGES',
            icon: 'pi pi-envelope',
            command: () => {
                   navigate("messages")
                           },
        },
        {
            label: 'USERS',
            icon: 'pi pi-users',
            command: () => {
                   navigate("users")
                           },
        },
        {
            label: 'REPORTS',
            icon: 'pi pi-chart-bar',
            command: () => {
                   navigate("reports")
                           },
        },
    ];

    const endContent = (
       <>
             <Avatar image={userData.image} shape="circle" onClick={e => overlayPanelRef.current.toggle(e)} />
             <OverlayPanel ref={overlayPanelRef}>
                <div className="flex flex-column gap-2">
                         <div className="flex-1  p-2 shadow-1">
                               {userData.username}
                         </div>
                         <Divider />
                         <div className="flex-1 bg-blue-200">
                         <Button label="LOG OUT" size="small" className="w-full" icon="pi pi-sing-out" onClick={handleLogOut}/>
                         </div>
                </div>
             </OverlayPanel>
       </>
    )

    return (
        <div className="flex flex-column h-full">
            <div className="flex-none">
            <div className={`card px-0 md:px-8`}>
             <Menubar model={items} end={endContent} />
            </div>            
            </div>          
            <div className="flex-1">
            <Outlet />
            </div>
        </div>
       
    )

} 

export async function actionForLogOut({params,request}){
             const response = await httpRequest({path:"api/user/logout",addToken:true,method:"POST",onCompletedfetch:cleanToken})
             if(response.state !== "ok")
             {
                 return response
             }
             console.log("resData.data.message : ",response.message)
             return redirect("/login")
}
