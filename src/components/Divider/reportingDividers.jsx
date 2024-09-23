import { useState,useEffect } from "react";
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
export default function ReportingDivider({onClick}){
    const [width, setWidth] = useState(window.innerWidth);
    const [pageState , setPageState] = useState({initial:true,index:1}) 
    const handleButtonsClick = (index) => {
              if(index !== 1)
              {
                  onClick(index)
                  setPageState(oldState => {
                      return {...oldState,initial:false,index}
                  })
              }
     }
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
        
          return   <div className="flex flex-row md:flex-column md:h-full">
          <div className="flex-1 ">
                <Divider  layout={width <= 600 ? "horizontal" : "vertical"} />
          </div>  
          <div className="flex-initial flex justify-content-center ">
             <Button icon="pi pi-chart-bar" rounded  aria-label="bar" outlined={pageState.index !== 0} raised={pageState.index === 0} size={pageState.index === 0 ? "large" : "small"} className={`${pageState.index === 0} ? "shadow-6" : ""`} onClick={() => handleButtonsClick(0)} />
          </div> 
          <div className="flex-1 ">
          <Divider  align="center" layout={width <= 600 ? "horizontal" : "vertical"} />
          </div>  
          <div className="flex-initial flex justify-content-center ">
          <Button icon="pi pi-exclamation-circle" rounded  aria-label="default" outlined={pageState.index !== 1} raised={pageState.index === 1} size={pageState.index === 1 ? "large" : "small"} disabled={!pageState.initial}  className={pageState.index === 1 ? "shadow-6" : ""} onClick={() => handleButtonsClick(1)}/>
          </div> 
          <div className="flex-1 ">
          <Divider  align="center" layout={width <= 600 ? "horizontal" : "vertical"} />
          </div>  
          <div className="flex-initial flex justify-content-center ">
          <Button icon="pi pi-chart-pie" rounded aria-label="pie" outlined={pageState.index !== 2} raised={pageState.index === 2 } size={pageState.index === 2 ? "large" : "small"} onClick={() => handleButtonsClick(2)} className={pageState.index === 2 ? "shadow-6" : ""}/>
          </div> 
          <div className="flex-1 ">
          <Divider  align="center" layout={width <= 600 ? "horizontal" : "vertical"} />
          </div>  
    </div> 

}