import React, { useEffect, useRef } from "react";
import project from "../libs/project";





export function FormLogin(){
    const formElem = useRef(null);
    const {username, login, role, logOut } =  project(s=>({
        username:   s.user.username,
         login  :   s.userlogin, 
         role   :   s.user.role, 
         logOut :   s.logOut}))
   
    function handleSubmit(e){
        e.preventDefault();
        console.log('FormLoginSubmit', formElem, e);
        login(  formElem.current.querySelector("[name=username]").value , 
                formElem.current.querySelector("[name=pass]").value)
        return false;
    }
    function logout(){

    }
if(role != 'guest'){
    return <><input type="checkbox" id="userLoginForm" className="modal-toggle" />
    <label htmlFor="userLoginForm" className="modal cursor-pointer">
      <label className="modal-box relative" htmlFor="userLoginForm">
        <h3 className="text-lg font-bold">Good bye?</h3>
        <button onClick={logOut}>Logout</button>
        </label>
    </label>
    </>
}
return (<>
<input type="checkbox" id="userLoginForm" className="modal-toggle" />
<label htmlFor="userLoginForm" className="modal FormLoginModal cursor-pointer" onClick={e=>{console.log(e);e.stopPropagation()}}>
  <label className="modal-box relative" htmlFor="userLoginForm">
    <h3 className="text-lg font-bold">Hi, </h3>
    <p className="py-4">Register or Login !</p>
    <form className="" 
        onSubmit={e=>handleSubmit(e)} 
        ref={formElem}>
        <div className="form-line ">
          <span >Email</span>
          <input name="username" placeholder="ornek@google.com" 
                className="input input-bordered " /></div>
        <div className="form-line ">
          <span className="label-text">Password</span>
          <input  name="pass" placeholder="######" type="password" 
                className=" input input-bordered " /></div>
        <div className="form-line">
          <span></span>
        <button className="btn gap-2"  type="submit">
                Enter
        </button>
        </div> 
    </form>
  </label>
</label></>)
}


export function formBaska(){
    //<input type="checkbox" id="my-modal-4" className="modal-toggle" />
return (
<label htmlFor="formBaska" className="modal cursor-pointer">
  <label className="modal-box relative" for="">
    <h3 className="text-lg font-bold">Merhaba Giris y!</h3>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
  </label>
</label>)
}
