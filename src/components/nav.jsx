import { Link, Route }  from "wouter";
import project          from "../libs/project";
import {FormLogin}      from "./user"
import Alert            from "./alerter"

export default ()=>{
  let pr =  project(s=>({user:s.user, alerts:s.alerts }))  
  return <nav className="Nav">
    <div><a href='/' >
          <img width="50" height="50" src='/i/Ethereum_logo_24.png'  alt='CoinBank24' className="logo"/></a></div>
    <div></div>
    <div className="navLinks">
        <LoginLogout guest={pr.user.username=='guest'} />
         
        <Link href='/TransactionAlert' > Transaction Alert     </Link>
        <Link href='/HowToGetPayment' > How To Get Payment     </Link>
        <Link href='/MakePayment' >         Make Payment    </Link>
        <Link href='/Contact' >        Contact         </Link>
        <FormLogin /> 
        <Alert />
    </div> 
  </nav>
}

function LoginLogout({guest}){

  function openLoginForm(e){
    e.preventDefault() 
    console.log(e)
    document.querySelector('#userLoginForm').click();//classList.toggle('modal-open')
    return false;
  }
  if(guest)
    return <Link href='' onClick={openLoginForm}>Login/Register</Link>
  return   <>
    <div className="menuOpen">
      <Link href='' >Profile</Link>
      <div className="menuHidden">
        <Link href="/profile" >Profile</Link>
        <Link href='' onClick={openLoginForm}>Logout</Link>
      </div>
    </div>
          </>
}