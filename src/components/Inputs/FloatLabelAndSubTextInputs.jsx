import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Message } from 'primereact/message';
export default function FloatLabelAndBubTextInputs ({name,value,onChange,label,underText,isPassword,isDisabled=false,isValid}){

      return    <>
                                         <FloatLabel>
                                         <InputText id={name} name={name} value={value} onChange={onChange} disabled={isDisabled}
                                          type={!isPassword ? "text" : "password"}  className='w-full border-round-2xl' aria-describedby={`${name}-help`} />
                                         <label htmlFor={name}>{label}</label>
                                         </FloatLabel>
                                          <small id={`${name}-help`} className='align-self-end'>
                                          <Message severity={!isValid ? "info" : "error"} text={underText} />
                                         </small>
               </>

}