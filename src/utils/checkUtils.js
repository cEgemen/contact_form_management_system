import { httpRequest } from "../service/httpRequest";
 
 export async function checkLoginWithFetch(isCheckAdmin=false){
       const response = await httpRequest({path:"api/user/check-login",addToken:true,method:"POST",}) 
       console.log(isCheckAdmin)
       if(isCheckAdmin)
       {
          if(response.state === "ok")
               {
                     if(response.user.role === "admin")
                     {
                         return response
                     }
                      return {...response,state:"not-correct-role"}
               }      
            return response      
       }
       return response
     }
    
 export async function checkAuthLoader(){
       const response = await checkLoginWithFetch()
       return response
 }    
 

 export function loginCheck (name , password){
      const result = {state:"valid",messages:{passwordMessage:null,userNameMessage:null}}
      const notValid ="not-valid"
      const passwordMessage = "Password is empty"   
      const userNameMessage = "User name is empty"   
      if(name.trim() === "" && password.length === 0)
      {
          result.state = notValid
          result.messages = {passwordMessage,userNameMessage}
      }
      else if(name.trim() === "")
      {
        result.state = notValid
        result.messages = {...result.messages,userNameMessage}
      }
      else if(password.length === 0){
        result.state = notValid
        result.messages = {...result.messages,passwordMessage}
      }

      return result
        

 }


 export function homeCheck (userName , message){
    const result = {state:"valid",messages:{messageMessage:null,userNameMessage:null,}}
    const notValid ="not-valid"
    const messageMessage1 = "Message is empty"   
    const userNameMessage1 = "User name is empty"
    const messageMessage2= "Message is more than 500 characters"   
    const userNameMessage2 = "User name is more than 50 characters"     
     if((userName.trim() === "" || userName.length > 50) && (message.trim() === "" || message.length > 500))
     {
          result.state = notValid
          if(userName.trim() === "")
          {
               result.messages = {...result.messages,userNameMessage:userNameMessage1}
          }
          else{
               result.messages = {...result.messages,userNameMessage:userNameMessage2}
          }
          if(message.trim() === "")
             {
               result.messages = {...result.messages,messageMessage:messageMessage1}
             }
           else{
               result.messages = {...result.messages,messageMessage:messageMessage2}
           }  
     }
     else if((userName.trim() === "" || userName.length > 50))
     {
        result.state = notValid
        if(userName.trim() === "")
            {
                 result.messages = {...result.messages,userNameMessage:userNameMessage1}
            }
            else{
                 result.messages = {...result.messages,userNameMessage:userNameMessage2}
            }
     }
     else if((message.trim() === "" || message.length > 500))
     {
        result.state = notValid
        if(message.trim() === "")
            {
              result.messages = {...result.messages,messageMessage:messageMessage1}
            }
          else{
              result.messages = {...result.messages,messageMessage:messageMessage2}
          }  
     }
     return result
       
 
 } 


 export function userFormCheck(userName,password,photo)
 {
    const result = {state:"valid",messages:{passwordMessage:null,userNameMessage:null,base64PhotoMessage:null}}
    const notValid ="not-valid"
    const passwordMessage1 = "Password is empty"   
    const userNameMessage1 = "User name is empty"
    const photoMessage1 = "Photo is not selected"
    const passwordMessage2= "Password is more than 10 characters"   
    const userNameMessage2 = "User name is more than 10 characters" 
  
    if((userName.trim() === "" || userName.length > 10) && (password.trim() === ""  || password.length > 10) && photo.trim() === "")
       {
           result.state = notValid
           if(userName.trim() === "")
            {
                 result.messages = {...result.messages,userNameMessage:userNameMessage1}
            }
            else{
                 result.messages = {...result.messages,userNameMessage:userNameMessage2}
            }
            if(password.trim() === "")
                {
                     result.messages = {...result.messages,passwordMessage:passwordMessage1}
                }
                else{
                     result.messages = {...result.messages,passwordMessage:passwordMessage2}
                }
                if(photo.trim() === "")
                    {
                         result.messages = {...result.messages,base64PhotoMessage:photoMessage1}
                    }
       }
      else if ((userName.trim() === "" || userName.length > 10) && (password.trim() === "" || password.length > 10))
        {
            result.state = notValid
            if(userName.trim() === "")
                {
                     result.messages = {...result.messages,userNameMessage:userNameMessage1}
                }
                else{
                     result.messages = {...result.messages,userNameMessage:userNameMessage2}
                }
                if(password.trim() === "")
                    {
                         result.messages = {...result.messages,passwordMessage:passwordMessage1}
                    }
                    else{
                         result.messages = {...result.messages,passwordMessage:passwordMessage2}
                    }
        } 
        else if((userName.trim() === "" || userName.length > 10) &&  photo.trim() === "")
        {
            result.state = notValid
            if(userName.trim() === "")
                {
                     result.messages = {...result.messages,userNameMessage:userNameMessage1}
                }
                else{
                     result.messages = {...result.messages,userNameMessage:userNameMessage2}
                }
                    if(photo.trim() === "")
                        {
                             result.messages = {...result.messages,base64PhotoMessage:photoMessage1}
                        }
        }
        else if((password.trim() === "" || password.length > 10) && photo.trim() === "")
        {
            result.state = notValid
                if(password.trim() === "")
                    {
                         result.messages = {...result.messages,passwordMessage:passwordMessage1}
                    }
                    else{
                         result.messages = {...result.messages,passwordMessage:passwordMessage2}
                    }
                    if(photo.trim() === "")
                        {
                             result.messages = {...result.messages,base64PhotoMessage:photoMessage1}
                        }

        }
        else if ((userName.trim() === "" || userName.length > 10))
            {
                result.state = notValid
                if(userName.trim() === "")
                    {
                         result.messages = {...result.messages,userNameMessage:userNameMessage1}
                    }
                    else{
                         result.messages = {...result.messages,userNameMessage:userNameMessage2}
                    }
            } 
            else if((password.trim() === "" || password.length > 10))
            {
                result.state = notValid
                
                    if(password.trim() === "")
                        {
                             result.messages = {...result.messages,passwordMessage:passwordMessage1}
                        }
                        else{
                             result.messages = {...result.messages,passwordMessage:passwordMessage2}
                        }
            }
            else if(photo.trim() === "")
            {
                result.state = notValid
                        if(photo.trim() === "")
                            {
                                 result.messages = {...result.messages,base64PhotoMessage:photoMessage1}
                            }
            }
        console.log("user form check : ",result)
        return result
 }