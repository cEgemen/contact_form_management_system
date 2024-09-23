import { Outlet} from "react-router-dom"
    export default function MainLayout(){
    return (
        <div className="flex flex-column h-full ">      
        <div className="flex-1">
        <Outlet />
        </div>
    </div>
    )

} 


