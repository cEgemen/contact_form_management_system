import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';        
export default function FloatLabelAndSubTextTextArea({name,value,onChange,label,underText,isDisabled=false,isValid,rows=5,columns=5}){

    return    <>
                                       <FloatLabel>
                                       <InputTextarea id={name} name={name} value={value} disabled={isDisabled} onChange={onChange}
                                        type="text"  className='w-full border-round-2xl' aria-describedby={`${name}-help`} cols={columns} rows={rows} style={{resize:"none"}} />
                                       <label htmlFor={name}>{label}</label>
                                       </FloatLabel>
                                        <small id={`${name}-help`} className='align-self-end'>
                                        <Message severity={!isValid ? "info" : "error"} text={underText} />
                                       </small>
             </>

}