import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function ShortableDataTable({datas,columnHeadData,header=null,footer=null}){

    return (
        <div className="card">
            <DataTable  header={header} footer={footer} value={datas} removableSort  >
                {columnHeadData.map((data,index) => {
                        const {field,header,body} = data
                        if(field !== undefined)
                        {
                          return <Column key={index} field={field} header={header} showAddButton sortable style={{ width: '25%' }} ></Column>
                        }
                        else{
                          return <Column  key={index} header={header} body={body} style={{ width: '25%' }} ></Column>
                        }
                        
                })}
            </DataTable>
        </div>
    );

} 