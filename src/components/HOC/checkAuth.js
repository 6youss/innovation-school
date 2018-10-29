import jwt from 'jsonwebtoken';

const checkAuth = (rights,path)=>{
  const token = jwt.decode(localStorage.getItem('token'));
  
  if(token) {
    if(rights.indexOf(token.userType) === -1){
      //the user doesn't have the right to acces this route
      return {redirect:'/signin'};
    }else{
      //if the user is a teacher he can only view his own page
      if(token.userType===1){
        if(path!=='/teacher'){
          return {redirect:'/teacher'};
        }
      }
      return {component:'true'};
    }
  }else
    return {redirect:'/signin'};
}

export default checkAuth;