
import { color } from 'chart.js/helpers';
import { Chart } from 'primereact/chart';
        
export function BarChart({labels,datas,chartName}){

    const data = {
        labels:labels,
        datasets:[
            {
                label:chartName,
                data:datas
            }
        ]

    }
     
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return <Chart type="bar" data={data} options={options}  className="w-full md:w-30rem "/>
}