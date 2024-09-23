import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import CustomCard from './customCard';
import { Avatar } from 'primereact/avatar';
import { Skeleton } from 'primereact/skeleton';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { converToLocaleDateString } from '../../utils/converterUtils';

export default function MessageCard({name,creationDate,read,url}) {
    const navigate = useNavigate()
    const date = converToLocaleDateString(creationDate) 
    const [isOpen,setIsOpen] = useState(false)
    const handleInfoClick = () => {
           setIsOpen(true)
    }
    function encodeName(name){
        let encodingName = name;
         const splitName = encodingName.split(" ")
         if(splitName.length > 1)
         {
              for(let i = 0 ; i<splitName.length ; i++)
              {
                 if(i === 0)
                 {
                     encodingName = splitName[i]
                 }
                 else{
                     encodingName += " ######"
                 }
              }
         }
         return encodingName
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
           <h4 className='m-0 p-0 underline'>Sender Name</h4> 
           <h5 className='m-0 p-0'>{encodeName(name)}</h5>
           </div>
        </div>
        <div>
              <Avatar icon="pi pi-info" shape="circle" className='bg-yellow-500 text-white' onClick={handleInfoClick}/>    
        </div>
               </>
    );

    const main = (
           <>
                  <Skeleton width="100%" className='mb-1'></Skeleton>
                  <Skeleton width="100%" className='mb-1'></Skeleton>
                  <Skeleton width="75%"></Skeleton>       
           </>
    )

    const footer = (
        <>
            <Button icon="pi pi-cloud" iconPos='right' text label='Detail' className='text-white' onClick={e => {
                      navigate(url)
            }} />
            <div>
            <h4 className='m-0 p-0 underline'>Date</h4> 
            <h5 className='m-0 p-0'>{date}</h5>
            </div>
        </>
    );
    return (
            <>
             <CustomCard  main={main} footer={footer} header={header}/> 
             <Dialog  header={headerDialog} visible={isOpen} style={{ width: '50vw' }} onHide={() => setIsOpen(false)}>
                   <>  
                    <p>
                          {`This message has ${read === "false" ? "not" : ""} been read before. Click on the detail section for more information about the message and the sender.`}
                    </p>
                   </>
             </Dialog>
            </>
           
    )
}
        