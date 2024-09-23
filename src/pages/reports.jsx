import { useActionData, useNavigation, useSubmit,json } from "react-router-dom"
import chartImg from "../assets/images/chart.png"
import ReportingDivider from "../components/Divider/reportingDividers"
import { ProgressSpinner } from 'primereact/progressspinner';
import PieChart from "../components/Charts/pie";
import { separateCountriesDataFromMessages, separateGenderDataFromMessages } from "../utils/converterUtils";
import { BarChart } from "../components/Charts/bar";
import { httpRequest } from "../service/httpRequest";
export default function Reports(){
     const data = useActionData()
     console.log("action reports : ",data)
     const submit = useSubmit()
     const navigation = useNavigation()
     const handleClick = (index) => {
               const data = new FormData()
               data.append("mode",index)
               submit(data,{method:"POST"})
                                     }
      let content ;
      if(navigation.state === "submitting")
            {
                 content = <ProgressSpinner />
            }                               
      else if (data === undefined)
            {
                 content = <Content title="REPORTS INFORMATIONS" desc="Two charts will be shown according to the gender and country of the people sending the messages regarding the messages in the system. A Bar Chart will be shown according to the gender of the people sending the messages and a Pie Chart will be shown according to the countries of the people." Content={<>
                                                                                       <img src={chartImg} className="w-15rem md:w-30rem"/> 
                                                                                  </>}/>
            }
      else if (data.mode === "0")
            {  
                 const separateData = separateCountriesDataFromMessages({messages:data.messages}) 
                 content =   <Content title="BAR CHART" desc={`This chart was prepared according to the countries of the people who sent messages. These messages were prepared according to the country where the most messages were sent and the country where the least messages were sent.`} Content={<BarChart labels={separateData.labels} datas={separateData.datas}  chartName="Countries of Messages"/>}/>
            }     
       else if (data.mode === "2")
            {
                        const separateData = separateGenderDataFromMessages({messages:data.messages,genderList:["male","female"]})
                        content =  <Content title="PIE CHART" desc={`This chart has been prepared according to the gender of the people sending messages. The number of messages sent by people of female gender is ${separateData.datas[1]}, and the number of messages sent by people of male gender is ${separateData.datas[0]}.`} Content={<PieChart labels={separateData.labels} datas={separateData.datas}  />}/>   
            }      
     return <>
                   <div className="p-0 md:pr-8 md:pl-5 h-full ">
                         <div className="grid  h-full m-0 ">
                                  <div className="col-12 md:col-1 p-0">
                                          <ReportingDivider onClick={handleClick}/>     
                                  </div>
                                  <div className="col-12 md:col-11 p-0 md:p-8 ">
                                              {content}
                                  </div>
                         </div>
                   </div>
            </>

} 

export async function actionForReports({params,request}){
               const formData = await request.formData()
               const mode = formData.get("mode")
               const response = await httpRequest({path:"api/messages",addToken:true})
                console.log("response : ",response)
                if(response.state !== undefined && response.state === "ok")
                {
                    return {mode,messages:response.messages}
                }

                 return response
}


function Content({title,desc,Content}) {
      return  <div className="flex flex-column h-full ">
      <div className="flex-initial flex p-0">
               <div className="flex-1 ">
                    <h2 className="text-center text-white ">{title}</h2>
               </div> 
     </div>
     <div className="flex-initial">
          <p className="text-center text-white m-0 p-0 md:px-8">
         {desc}
          </p>
     </div>
     <div className="flex-1 flex justify-content-center align-items-center">
        {Content}
     </div>           
         </div>  
}