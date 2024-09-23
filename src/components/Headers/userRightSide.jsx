import { Avatar } from "primereact/avatar";


export function UserRightSide({icon,title,desc}){

        return <div className="p-0 m-0 md:pl-5 mb-2">
                                              <div className='flex flex-row align-items-center border-bottom-1 border-white mb-1' >
                                                    <Avatar icon={icon} shape="circle" className="mr-2"/>
                                                    <h3 className="text-white">{title}</h3>
                                                   </div>
                                                   <div  style={{minHeight:"10vh"}}>
                                                    <p className='text-white m-0' >
                                                        {desc}
                                                    </p>
                                                   </div>
                                                    
               </div>
}