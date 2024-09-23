import { json } from "react-router-dom";
import { getToken } from "../utils/localStrg"
import { handleResponse } from "./responseArrangements";

const BASE_URL = "http://localhost:5165/"

export async function httpRequest({path,method="GET",addToken=false,addBody=false,bodyData={},validFunction,onCompletedfetch=(data) => {}}){
      let token;
      let url;
      let validResult;
      let response;
      let fetchOption = {method,headers:{
               "Content-Type":"application/json"
      }};
      if(addToken)
      {
         token = getToken()
         fetchOption.headers = {...fetchOption.headers,"token":token}
      }
      url = BASE_URL + path
      if(addBody)
      {
           validResult = validFunction()
           console.log("valid result : ",validResult)
           if(validResult.state === "not-valid")
            {
               return {state:"not-valid",messages : validResult.messages}
            }
            fetchOption.body = JSON.stringify(bodyData)
      }
        try {
         response = await fetch(url,fetchOption)
         console.log("http request : ",response)
        } catch (error) {
            console.log("error : ",error)
        }
      console.log("response result : ",response)
      const resultResponse =await handleResponse(response,onCompletedfetch) 
      console.log("handleResponse result : ",resultResponse)
      return resultResponse
} 