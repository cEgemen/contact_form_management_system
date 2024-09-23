import { useLoaderData, useNavigate} from "react-router-dom"
import { Button } from "primereact/button"
import ShortableDataTable from "../components/Table/shortableDataTable"
import { Avatar } from "primereact/avatar"
import { httpRequest } from "../service/httpRequest"

export default function Users(){
     const {users} = useLoaderData()
     const navigate = useNavigate()
     
     const handleUserDetail = (id) => {
           navigate(id)
     }

     const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">USERS</span>
            <Button icon="pi pi-plus-circle" rounded tooltip="User Add" onClick={e => handleUserDetail("-1")}/>
        </div>
    );

 const userAvatar = (user) => <Avatar image={user.base64Photo} shape="circle"/>

    const editButton = (user) => <Button icon="pi pi-pencil" rounded tooltip="Edit" onClick={e =>{
        console.log(user)   
        handleUserDetail(""+user.id)
    }}/>   
     return <div className="md:px-8">
                <ShortableDataTable datas={users} columnHeadData={[{field:"username",header:"Name"},{field:"password",header:"Password"},{field:"role",header:"Role"},{header:"Photo",body:userAvatar},{header:"Edit",body:editButton}]} header={header} />
            </div>
}

export async function loaderForUsers({params,request}){
        const response = await httpRequest({path:"api/users",addToken:true})
        if(response.state !== "ok")
        {
             return response
        }
        console.log("users : ",response.user)
        return response
}
