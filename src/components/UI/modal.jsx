import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import classes from "./modal.module.css"
export default function Modal({children,className = ""}){
      console.log("run modal")
      const dialogRef = useRef()
      
      useEffect(()=> {

         const modal = dialogRef.current
         console.log("run useEffect")
         
                   modal.showModal()
              
         return () => {
            console.log("useEffect cleanUp")
            modal.close()
          } 
      },[])
    
      const content =  <dialog className={`${classes.modal} ${className}`} ref={dialogRef}>
                             {children}
                       </dialog>

      return createPortal(content,document.getElementById("modal")) 
}