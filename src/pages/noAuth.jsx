import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import auth from "../assets/images/auth.jpg"
export default ({message="Your key is not valid",status}) => {
     const navigate = useNavigate();
     const handleBackHome = () => {
         navigate("/")
     }
    return <>
               <div className="bg-white h-full py-1 m-0 lg:p-8 ">
                       <div className="flex flex-shrink-0 flex-column gap-3 md:gap-3 lg:flex-row  align-items-center justify-content-center h-full">
                             <div className="flex-initial">
                                      <img src={auth} className='bg-cover h-10rem md:h-20rem  w-20rem  md:w-25rem ' />
                             </div>
                             <div className="flex-initial" >
                                    <h1 className="text-center m-0 py-4">Error</h1>
                                     <h3 className="text-center m-0 pb-4">Page Not Access</h3>
                                     <p className="text-center m-0 mx-7 pb-4">You do not have the necessary authorization to enter this page. That's why you can't access the page. If you want, you can go to the home page.</p>
                                      <div className='flex w-full pb-4'>
                                      <Button label="Back Home"  rounded onClick={handleBackHome} className="mx-auto bg-red-400" />
                                      </div>                                     
                             </div>
                       </div>
                   </div>
          </>
} 