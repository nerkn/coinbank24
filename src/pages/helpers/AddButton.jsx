import project from "@/libs/project";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";

export default ()=>{
  let pr =  project(s=>({ user:s.user}));
  let [buttonCode, buttonCodeSet] = useState('');
  let refs = {
      Label: useRef(),
      Product: useRef(),
      Price:  useRef(),
      Fiat: useRef(),
      Kode: useRef(),
      Html: useRef(),
    }
  useEffect(() => {createButton();return},[]);
  useEffect(() => {
    refs.Html.current.innerHTML = buttonCode;

  }, [buttonCode])
  
  if(pr.user.role == 'guest')
    return '';
  function createButton(e){
    if(e){
      console.log(e);
      console.log(e.target.value);
    }
    //console.log(event.defaultPrevented);
    let vars = 'Product,Price,Fiat,Kode'.split(',');
    let link = new URLSearchParams();
    link.append('store', pr.user.id)
    for(let v of vars){
        let vv = refs[v].current.value;
        if(!vv)
          continue;
        link.append(v, vv)
    }

    buttonCodeSet( `<a href="https://coinbank24.com/pay/?${link.toString()}" target="_" rel="noopener noreferrer" >${refs["Label"].current.value}</a>`)
    return true;
  }

  return <div className="HelpersAddButton">
            <div className="Selections">
              <div><label>Label         </label>
                   <input name='upLabel' ref={refs.Label} defaultValue="80$" onChange={createButton}/>
                   <i title=""> </i></div>
              <div><label>Product         </label>
                   <input name='upProduct' ref={refs.Product} defaultValue="Clip Dot Tiered Skirt"  />
                   <i title="Optional">*</i></div>
              <div><label>Price           </label>
                   <input name='upPrice'   ref={refs.Price}   defaultValue="80" onChange={createButton}/>
                   <i title="Optional, if empty, user can enter">*</i></div>
              <div><label>Currency        </label>
                   <select name='upFiat'    ref={refs.Fiat}     onChange={createButton}><option  selected>USD</option><option>EUR</option><option>Eth</option><option>BTC</option></select>
                   <i title="If empty eth will be selected">*</i></div>
              <div><label>Additional Info </label>
                   <textarea name='upKode'    ref={refs.Kode}   onChange={createButton} >note should be attached: Happy birthday</textarea>
                   <i title="Optional">*</i></div>
            </div>
            <div className="ButtonRealize"  ref={refs.Html}>{buttonCode}</div>
            <div className="ButtonCode" >{String(buttonCode)}</div>
            <div className="ButtonCode" >{String(buttonCode)}</div>
          </div>
}