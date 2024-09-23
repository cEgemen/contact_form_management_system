
export function getToken (){
        
      const token =  localStorage.getItem("token")
      return token
}

export function saveToken(token){
        localStorage.setItem("token",token)
}

export function cleanToken(){
        localStorage.removeItem("token")
}