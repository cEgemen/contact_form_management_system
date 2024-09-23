import { useFormHook } from "../../hooks/formHook"
import FloatLabelAndSubTextInputs from "../Inputs/FloatLabelAndSubTextInputs"
import { Button } from 'primereact/button';
import {useNavigation } from 'react-router-dom';
import { useEffect } from "react";
import LabelAndImgContainerSelectFile from "../Inputs/LabelAndImgContainerSelectFile";
import { convertBase64 } from "../../utils/converterUtils";
export default function UserDetailForm({handleSubmit,initData={username:"",role:"reader",password:"",base64Photo:" "},data,mode}) {
    const [values,handleChangeValues,handleResetValues] = useFormHook(initData)
    const state = useNavigation()
    useEffect(() => {
       if(data !== undefined)
       {
          handleResetValues(initData)
       }

    },[data])

    const handleChange = (e) => {     
     handleChangeValues(e.target)
    }
  
    const handleFileChange = (e) => {
      const file = e.target.files[0]
      console.log("file : ",file)
      convertBase64(file,(base64) => {
            handleChangeValues({name:"base64Photo",value:base64})    
      },() => {
         console.log("onCancelFile run")
         handleChangeValues({name:"base64Photo",value:" "})
      })
}

    let isNotValid = false
     let userNameValid = false
     let passwordValid = false
   let base64Valid = false
     if(data !== undefined && data.state === "not-valid")
     {
           isNotValid = true
           if(data.messages.userNameMessage !== null)
              {
                 userNameValid = true
              }
           if(data.messages.passwordMessage !== null)
            {
                passwordValid = true
            }   
            if(data.messages.base64PhotoMessage !== null)
            {
                base64Valid = true
            }
     }
    const userNameUnderText = (isNotValid && userNameValid) ? data.messages.userNameMessage : "Enter your username to send."
    const passwordUnderText = (isNotValid && passwordValid) ? data.messages.passwordMessage : "Enter your password to send."
    const roleUnderText = "Enter your role to send."
    return   <form method="post" onSubmit={handleSubmit}>
    <div className='flex flex-column  gap-3 mb-3 mt-4'>
    <FloatLabelAndSubTextInputs underText={userNameUnderText} isDisabled={mode !== "-1"} label="User Name" isValid={userNameValid} name="username" value={values.username} onChange={handleChange} />
    </div>
    <div className='flex flex-column  gap-3  mb-3 mt-4'>
    <FloatLabelAndSubTextInputs underText={passwordUnderText} isPassword={true} label="Password" isValid={passwordValid} name="password" value={values.password} onChange={handleChange} />
    </div>
    <div className='flex flex-column  gap-3  mb-3 mt-4'>
    <FloatLabelAndSubTextInputs underText={roleUnderText} label="Role" isDisabled={true} isValid={false}  value={values.role} onChange={handleChange} />
    </div>
    <div className='flex flex-column  gap-3  mb-3 mt-4'>
       <LabelAndImgContainerSelectFile label="Photo"  value={values.base64Photo} isValid={base64Valid} name="base64Photo" onChange={handleFileChange} />
    </div>
    <div className='mb-3 mt-5 flex flex-column'>
       <Button className='border-round-lg align-self-center' label={`${state.state === 'submitting' ? "Submitting ..." : "Send" }`} />
    </div>
</form>

}

