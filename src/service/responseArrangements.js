import { redirect } from "react-router-dom"


export async function handleResponse(response,onCompletedfetch){
         if(!response.ok)
         {
             const resultStatus = await handleStatus(response)
             return resultStatus
         }

          const responseData = await response.json()
          onCompletedfetch(responseData.data)
          return {state:"ok",...responseData.data}
}


 async function handleStatus(response){
    console.log("status : ",response.status)
        if(response.status === 400)
        {
           const {error}  = await response.json()
           return {state:"error",error}
        }
        else if(response.status === 401)
             {
                return redirect("/login")
             }
         else if(response.status === 403)
            {
                 return redirect("/not-auth")
            }    
         else if(response.status === 404)
            {
                 return redirect("/not-found")
            } 
}

