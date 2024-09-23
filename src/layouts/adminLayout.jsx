import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { useNavigate,useFetcher,Outlet} from "react-router-dom";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
export default function AdminLayout(){
    const navigate = useNavigate()
    const fetcher = useFetcher()
    const overlayPanelRef = useRef()
    const {userData} = useSelector(state => state.user)
    console.log("userData : ",userData)
    const handleLogOut = () => {
         fetcher.submit(null,{method:"POST",action:"/user/reader"})
    } 

    const items = [
        { label: 'HOME', icon: 'pi pi-home',command:() => {
                   navigate("/user/admin?mode=return")
        } 
        },
        {
            label: 'MESSAGE',
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
                               <i className='pi pi-user mr-1'/> {userData.username}
                          </div>
                          <div className="flex-1 bg-blue-200">
                          <Button label="LOG OUT" size="small" className="w-full" icon="pi pi-sign-out" onClick={handleLogOut}/>
                          </div>
                 </div>
              </OverlayPanel>
        </>
     )

    return (
        <div className="flex flex-column h-full ">
            <div className="flex-none">
            <div className={`card px-0 md:px-8 w-full`}>
             <Menubar model={items} end={endContent} className={`bg-purple-100 border-none`} />
            </div>            
            </div>          
            <div className="flex-1">
            <Outlet />
            </div>
        </div>
       
    )

} 
