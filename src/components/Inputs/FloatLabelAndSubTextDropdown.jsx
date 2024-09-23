

import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { Message } from 'primereact/message';
export default function FloatLabelAndSubTextDropdown ({name,value,isDisabled=false,onChange,label,underText,countries}){

      return    <>
                                         <FloatLabel >
                                         <Dropdown id={name}  name={name} disabled={isDisabled} value={value} onChange={onChange} options={countries}  className='w-full border-round-2xl' aria-describedby={`${name}-help`} />
                                         <label htmlFor={name}>{label}</label>
                                         </FloatLabel>
                                          <small id={`${name}-help`} className='align-self-end'>
                                          <Message severity={"info"} text={underText} />
                                         </small>
               </>

}

