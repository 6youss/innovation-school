import jwt from 'jsonwebtoken';

const checkAuth = (rights)=>{
  const token = jwt.decode(localStorage.getItem('token'));
  const user = localStorage.getItem('user');
  console.log(token);
  if(token) return true;
  else false;
}

export default checkAuth;