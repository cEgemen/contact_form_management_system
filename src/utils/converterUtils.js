
export  function convertBase64(file,onloadend=(base64) => {},onCancel=() => {}){
    if(file === undefined || file.size <= 0)
        {
            onCancel()
        }
       else{
        const reader = new FileReader()
        reader.onloadend = () => {
              const base64 = reader.result
              onloadend(base64)
        }
        reader.readAsDataURL(file)
       } 
}

export function converToLocaleDateString(date){
    const newDate = new Date(date)
    const formatedDate = newDate.toLocaleDateString()
    return formatedDate
}


export function  separateGenderDataFromMessages({messages,genderList}){
        const genderCounts = [];
        for(const gender of genderList )
        {
            console.log(gender)
            genderCounts.push(messages.filter(message => message.gender === gender).length)
        }
        return {labels:genderList,datas:genderCounts}
}

export function  separateCountriesDataFromMessages({messages}){
    const existCountriesNames = [];
    const existCountriesCount = [];
    for(const message of messages )
    {
         const isExist = existCountriesNames.find(country => message.country === country)
         if(isExist !== undefined)
         {
            const index = existCountriesNames.indexOf(message.country)
            existCountriesCount[index] = existCountriesCount[index] + 1
            
            for(let i = 0 ; i<existCountriesCount.length-1 ; i++)
            {
                let maxValIndex = i;
                for(let j = i+1 ; j < existCountriesCount.length; j++)
                {
                    if(existCountriesCount[j] > existCountriesCount[maxValIndex])
                    {
                        maxValIndex = j;
                    }
                }
                const tmp1 = existCountriesCount[maxValIndex]
                const tmp2 = existCountriesNames[maxValIndex]
                existCountriesCount[maxValIndex] =  existCountriesCount[i];
                existCountriesCount[i] =  tmp1;
                existCountriesNames[maxValIndex] =  existCountriesNames[i];
                existCountriesNames[i] =  tmp2;
            }

         }
         else{
              existCountriesNames.push(message.country) 
              existCountriesCount.push(1)     
         }
    }

    return {labels:existCountriesNames,datas:existCountriesCount}
}
