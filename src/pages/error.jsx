import { useRouteError } from "react-router-dom";


export default function Error (){
    const error = useRouteError()
     console.log("error : ",error)
     return <>
                 <h1>{error}</h1>
           </>
}