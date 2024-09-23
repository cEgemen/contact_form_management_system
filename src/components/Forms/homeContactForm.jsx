import { useFormHook } from "../../hooks/formHook"
import FloatLabelAndSubTextInputs from "../Inputs/FloatLabelAndSubTextInputs"
import { Button } from 'primereact/button';
import {useNavigation } from 'react-router-dom';
import FloatLabelAndSubTextTextArea from "../Inputs/FloatLabelAndSubTextTextArea";
import FloatLabelAndSubTextDropdown from "../Inputs/FloatLabelAndSubTextDropdown";
import LabelAndSubTextRadioButton from "../Inputs/LabelAndSubTextRadioButton";
import { useEffect } from "react";
export default function HomeContactForm({handleSubmit,countries,data}) {
    const [values,handleChangeValues,handleResetValues] = useFormHook({userName:"",gender:"male",country:"Türkiye",message:""})
    const state = useNavigation()
    
      useEffect(() => {
       if(data !== undefined)
       {

          handleResetValues({userName:"",gender:"male",country:"Türkiye",message:""})
       }

    },[data])

    const handleChange = (e) => {     
     handleChangeValues(e.target)
    }
    let isNotValid = false;
    let useNameValid = false;
    let messageValid = false
    if (data !== undefined && data.state === "not-valid")
      {
          isNotValid = true;
          if(data.messages.userNameMessage !== null)
          {
            useNameValid = true
          }
          if(data.messages.messageMessage !== null)
          {
            messageValid = true
          }
      }
    const userNameUnderText = (isNotValid && useNameValid) ? data.messages.userNameMessage : "Enter your username to send."
    const messageUnderText = (isNotValid && messageValid) ? data.messages.messageMessage : "Enter your message to send."
    const countryUnderText = "Select your country to send."
    const genderUnderText = "Select your gender to send."
    return   <form method="post" onSubmit={handleSubmit}>
    <div className='flex flex-column  gap-3 mb-3 mt-4'>
    <FloatLabelAndSubTextInputs underText={userNameUnderText} label="User Name" isValid={useNameValid} name="userName" value={values.userName} onChange={handleChange} />
    </div>
    <div className='flex flex-column  gap-3  mb-3 mt-4'>
          <FloatLabelAndSubTextDropdown underText={countryUnderText} label="Country" name="country" value={values.country} onChange={handleChange} countries={countries} />
    </div>
    <div className='flex flex-column  gap-3  mb-3 mt-4'>
             <LabelAndSubTextRadioButton label="Gender"  name="gender" onChange={handleChange} underText={genderUnderText} value={values.gender} values={["male","female"]} />
    </div>
    <div className='flex flex-column  gap-3  mb-3 mt-4'>
       <FloatLabelAndSubTextTextArea underText={messageUnderText} label="Message" name="message" isValid={messageValid} value={values.message} onChange={handleChange}  />
    </div>
    <div className='mb-3 mt-5 flex flex-column'>
       <Button className='border-round-lg align-self-center' label={`${state.state === 'submitting' ? "Submitting ..." : "Send" }`}/>
    </div>
</form>

}