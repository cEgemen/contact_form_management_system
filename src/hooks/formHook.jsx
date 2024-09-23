import { useState } from "react"
export const useFormHook = (initData) => {
       const [values,setValues] = useState(initData)
     
       const handleChangeValues = (target) => {
            setValues(oldState => {
                  return {...oldState,[target.name]:target.value}
            })
       }

       const handleResetValues = (resetValues) => {
             setValues(oldState => resetValues)
       }
 
        return  [values,handleChangeValues,handleResetValues]
}