import { useEffect, useRef, useState } from "react";
import { Link, Route } from "wouter";
import project from "../libs/project";

export default ()=>{
  let pr =  project(s=>({ user:s.user, 
                          getCoins:s.getCoins, 
                          removeAddress:s.removeAddress,
                          addAddress:s.addAddress }))
  const [ coins, setCoins ]= useState()
  const aaCoin  = useRef('')
  const aaAdres = useRef('')
  const aaKey   = useRef('')
  useEffect(()=>{    
    if(pr.user.role == 'guest')
      return ;
      pr.getCoins().then(c=>{
        console.log('page/joinBussiness coin response', c)
        setCoins(c.data)
      }) 

  }, [pr.user.role])
  if(pr.user.role == 'guest'){
    return <div>
      <div className="pages-index ">
        <h3 className="">Cause you need <br /><b>Crypto</b></h3>
        <p> Regular payment is <br/> <s>slow</s> <s>cumbersome</s> <br /> <s>expensive</s> <s>hard</s> <br /> <s>complex</s> <s>bureaucratic</s> 
        </p>
        <img src='/i/accept cyrpto.webp' /> 
    </div>
    </div>
  }
  let removeAddress  = pr.removeAddress(setCoins);
  let addAddress     = (event)=>{
      event.preventDefault();
      pr.addAddress(setCoins, aaCoin.current.value , aaAdres.current.value, aaKey.current.value )};

return <>
    <div className="pages-index ">
        <h3 className="">Cause you need <br /><b>Crypto</b></h3>
        <p> Regular payment is <br/> <s>slow</s> <s>cumbersome</s> <br /> <s>expensive</s> <s>hard</s> <br /> <s>complex</s> <s>bureaucratic</s> 
        </p>
        <img src='/i/accept cyrpto.webp' /> 
    </div>
    <div className="flex">
    <form onSubmit={addAddress} className="flexColumn ">
      <h3>Add Address</h3>
      <div className="form-line2 row-gap1 p3">
      <span>Coin </span>  
          <select ref={aaCoin}>
            <option disabled="disabled">BTC</option>
            <option>Eth</option>
            <option disabled="disabled">Trx</option>
            <option disabled="disabled">Doge</option>
          </select> 
      <span> Address</span>
            <input name="adress" ref={aaAdres} />
      
      <span> Private Key</span>
            <input name="key" ref={aaKey} title="Optional"/>
      <span></span>
      </div>
      <div>Add your coin addresses to <br />watch for transactions.</div>
      <input type="submit" Value='Add' className="button" />
    </form>

    <div className="flexGrow1">
      <h3>Your Coins </h3>
      <div className="myCoinsTable">
      {coins?.map(c=><>
          <div>{c.coin}</div>
          <div className="monospace">{c.address}</div>
          <div>{c.balance}</div> 
          <div><a href='#' title="Remove" onClick={removeAddress(c.address)} className="button">X</a> </div>
          </>)}
      </div>
    </div>
    </div>
    </>
}
    
    