import { Button } from 'primereact/button';
import { useRef } from 'react';
export default function LabelAndImgContainerSelectFile ({name,value,onChange,isDisabled=false,label,isValid}){
         
      const photoRef = useRef()
       
      const handletriggerInput = () => {
           photoRef.current.click()
      } 
 
      


      return    <>

                                        <label htmlFor={name} >{label}</label>
                                        <div className='flex flex-column md:flex-row flex-wrap  gap-3 '>
                                               <div  className='flex-initial align-self-center'>
                                                 <input  id={name} name={name} ref={photoRef} type='file' accept='.png,.jpeg,.jpg' onChange={onChange} style={{display:"none"}} />
                                                 <Button disabled={isDisabled} icon="pi pi-cloud-upload" type="button" label='Select Photo' onClick={handletriggerInput} />
                                               </div>  
                                             <div className='flex-1 flex justify-content-center '>
                                                <div className={`w-15rem h-7rem border-2 border-dotted ${isValid ? "bg-red-400 text-white" : "bg-white text-"}`}>
                                                         {value.trim() === "" ? <p className='text-center pt-4'>Select Photo</p> : <img  src={value} className='w-15rem h-7rem' />}
                                                </div>
                                             </div>
                                                

                                                  
                                        </div>
                                         
                                    
               </>

}