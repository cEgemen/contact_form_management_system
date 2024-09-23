import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import notFound from "../assets/images/not-found.jpg"
export default () => {
       const navigate = useNavigate()
       const handleBackHome = () => {
             navigate("/")
       }
       return <>
                   <div className="bg-white h-full py-1 m-0 lg:p-8 ">
                       <div className="flex flex-shrink-0 flex-column gap-3 md:gap-3 lg:flex-row  align-items-center justify-content-center h-full">
                             <div className="flex-initial">
                                      <img src={notFound} className='bg-cover h-10rem md:h-15rem  w-20rem  md:w-25rem ' />
                             </div>
                             <div className="flex-initial" >
                                    <h1 className="text-center m-0 py-4">404 Error</h1>
                                     <h3 className="text-center m-0 pb-4">Page Not Found</h3>
                                     <p className="text-center m-0 mx-5 pb-4">We couldn't find the page you were looking for. You can try again or go to the home page.</p>
                                      <div className='flex w-full pb-4'>
                                      <Button label="Back Home"  rounded onClick={handleBackHome} className="mx-auto bg-red-400" />
                                      </div>                                     
                             </div>
                       </div>
                   </div>
             </>
}