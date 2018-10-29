import React from 'react';
import { 
        Route,
        Redirect,
       } from 'react-router-dom';

import checkAuth from './HOC/checkAuth'

const PrivateRoute = ({ component: Component,rights,path, ...rest }) => {
  
  return (
    <Route
      path={path}
      {...rest}
      render={props =>{
        
        const checked =  checkAuth(rights,path);
        
        if(checked.component){
          return (<Component {...props}/>);
        }

        if(checked.redirect) {
          return(
            <Redirect
              to={{
                pathname: checked.redirect,
                state: { from: props.location }
              }}
            />
          );
        }

        return null;
      }
        
      }
      
    />
  )
};

export default PrivateRoute;