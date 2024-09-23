import { Message } from 'primereact/message';
export default function LabelAndSubTextRadioButton ({name,value,isDisabled=false,onChange,label,underText,values}){

      return    <>

                                        <label htmlFor={name}>{label}</label>
                                        <div className='flex flex-wrap gap-3'>
                                             {values.map((buttonValue,index) => {
                                            return  <div key={index} className='flex align-items-center'>
                                                 <input type='radio' disabled={isDisabled}  id={name} name={name} value={buttonValue} onChange={onChange} checked={value === buttonValue}  />
                                                 <label htmlFor={name} className="ml-2">{buttonValue}</label>
                                                </div>    
                                               
                                          })}
                                        </div>
                                         
                                          <small id={`${name}-help`} className='align-self-end'>
                                          <Message severity={"info"}  text={underText} />
                                         </small>
               </>

}
