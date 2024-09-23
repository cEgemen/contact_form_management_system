
export default function CustomCard({header,main,footer}){
 
    return <>
               <div className="grid  m-3 shadow-4">
                    <div className="col-12 flex justify-content-between align-items-center surface-400">
                            {header}
                    </div>
                         <div className="col-12  bg-white">
                                 {main}
                         </div>
                    <div className="col-12 flex justify-content-between align-items-center surface-400">
                            {footer}
                    </div>
                    
               </div>
          </>


}