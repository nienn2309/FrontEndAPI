import React from 'react';
import LSstyle from './Login.module.css'

const Login = () => {

  return (
    <div class={LSstyle.loginpage}>
      <div class={LSstyle.wrapper}>
        <div class={LSstyle.loginbox}>
          <div class={LSstyle.loginheader}>
            <span>Login</span>
          </div>
          <div class={LSstyle.inputbox}>
            <input type="text" placeholder="Username..."/>
            <i class="bx bx-user icon"></i>
          </div>
          <button class={LSstyle.loginbtn} >Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;