import { useFormHook } from "../../hooks/formHook"
import FloatLabelAndSubTextInputs from "../Inputs/FloatLabelAndSubTextInputs"
import { Button } from 'primereact/button';
import {useNavigation } from 'react-router-dom';
export default function LoginForm ({handleSubmit,data}) {
     const [values,handleChangeValues] = useFormHook({userName:"",password:""})
     const state = useNavigation()
     if(data !== undefined)
     {
      console.log("login form data state : ",data.state)
     }
     let isNotValid = false
     let userNameValid = false
     let passwordValid = false
     console.log("action data from loginPage : ",data)
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
     }
      const handleChange = (e) => {        
      handleChangeValues(e.target)
     }
     const userNameUnderText = (isNotValid && userNameValid) ? data.messages.userNameMessage : "Enter your username to login."
     const passwordUnderText = (isNotValid && passwordValid !== null) ? data.messages.passwordMessage : "Enter your password to login."
     return   <form method="post" onSubmit={handleSubmit}>
     <div className='flex flex-column  gap-3 mb-3 mt-4'>
     <FloatLabelAndSubTextInputs underText={userNameUnderText} label="User Name" isValid={userNameValid} name="username" value={values.useName} onChange={handleChange} />
     </div>
     <div className='flex flex-column  gap-3 mb-3 mt-4'>
        <FloatLabelAndSubTextInputs underText={passwordUnderText} isPassword={true} label="Password" name="password" isValid={passwordValid} value={values.password} onChange={handleChange} />
     </div>
     <div className='mb-3 mt-5 flex flex-column'>
        <Button className='border-round-lg align-self-center' label={`${state.state === 'submitting' ? "Submitting ..." : "Login" }`}/>
     </div>
</form>

}