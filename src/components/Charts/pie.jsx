

import { Chart } from 'primereact/chart';
        
export default function PieChart({labels,datas}){

   const data = {
               labels:labels,
               datasets:[
                  {
                    data:datas 
                  }
               ],
   }

   const options = {
    plugins: {
        legend: {
            labels: {
                usePointStyle: true
            }
        }
    }
};

   return <Chart type='pie' data={data} options={options}  className="w-20rem" />

}