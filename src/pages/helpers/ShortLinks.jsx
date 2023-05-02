import project from "@/libs/project";
import helpers from "@/libs/helpers";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";

export default ()=>{
  let pr =  project(s=>({ 
                      addAlert:s.addAlert,
                      user:s.user, 
                      getSlug:s.getSlug, 
                      getPaymentLinks:s.getPaymentLinks}));
  let [buttonCode, buttonCodeSet] = useState('');
  let [paymentLinks, paymentLinksSet] = useState([]);
  let [paymentLinksUpdate, paymentLinksUpdateSet] = useState(0);
  let refs = {
      id: useRef(),
      product: useRef(),
      price:  useRef(),
      //priceOptional:  useRef(),
      slug:  useRef(),
      fiat: useRef(),
      kode: useRef(),
      Html: useRef(),
    }
  useEffect(()=>{pr.getSlug().then(s=>{
                    refs.slug.current.value=s;
                    createButton();               })}                  ,[]);
  useEffect(()=>{pr.getPaymentLinks().then(p=>{
                    if(p.err)
                      return pr.addAlert(p.err)
                    paymentLinksSet(p.data)       })},[paymentLinksUpdate]  )
  useEffect(()=>{refs.Html.current.innerHTML = buttonCode;
                                                  }, [buttonCode])
  
  if(pr.user.role == 'guest')
    return '';
    
  function createButton(){
    let vars = 'product,price,slug,fiat,kode'.split(',');
    let link = new URLSearchParams();
    link.append('store', pr.user.id)
    for(let v of vars){
        console.log(v, refs[v])
        let vv = refs[v].current.value;
        if(!vv)
          continue;
        link.append(v, vv)
    }
    buttonCodeSet( `https://coinbank24.com/pay/${refs.slug.current.value}`)
  }
  function formSubmit(e){
    e.preventDefault();
    helpers.fetch('/payment/PaymentLinks', 
                      [...e.target.elements]
                      .reduce( (a,e)=>{a[e.name]=e.value; return a},{})
                ).then(r=>{
                  if(r.err) 
                    return pr.addAlert(r.err); 
                  pr.addAlert(r.msg)
                  paymentLinksUpdateSet(paymentLinksUpdate+1);
                  })
  }
  function paymentLinkEdit(e, paymentLink){
    e.preventDefault();
    for(let t in paymentLink){
      if(!refs[t]){
        console.log(t, 'cant be found' )
        continue
      }

      console.log(t, 'coming' )
      refs[t].current.value = paymentLink[t]
    }
    pr.addAlert('You can edit!', 500000)
  }

  return <div className="HelpersAddButton">
            <form className="Selections" onSubmit={formSubmit}>
              <input name='id' defaultValue="0" ref={refs.id} className='hidden' />
              <div><label>Slug         </label>
              <div>
              <input name='slug' ref={refs.slug} defaultValue="" onChange={createButton}/>
              </div></div>
              <div><label>Product         </label><input name='product' ref={refs.product} defaultValue="Grape Phone"  /></div>
              <div><label>Price           </label><input name='price'   ref={refs.price}   defaultValue="1" /></div>
              <div><label>Currency        </label><select name='fiat'    ref={refs.fiat}     >
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option  value='eth' selected>Eth</option>
                <option value='btc'>BTC</option></select></div>
              <div><label>Additional Info </label><textarea name='kode'    ref={refs.kode}    >note should be attached: to my precious</textarea></div>
              <div><label>  </label><input value='Save'  type='submit'  /></div>
            </form>
            <div className="ButtonRealize"  ref={refs.Html}>{buttonCode}</div>
            <div className="ButtonCode" >{String(buttonCode)}</div>
            <div className="paymentLinks">
              <h4>Existing Links</h4>
              <div className="paymentLink">
                <div>Slug</div>
                <div>Product</div>
                <div>Price</div>
                <div>Fiat</div>
                <div>Updated at</div>
              </div>
              {paymentLinks.map((p)=><div className="paymentLink">
                <div><a href="" onClick={(e)=>paymentLinkEdit(e, p)} >{p.slug}</a></div>
                <div>{p.product}</div>
                <div className="text-right">{p.price}</div>
                <div>{p.fiat}</div>
                <div>{p.updatedAt.slice(0,10)}</div>
                </div>)}
            </div>
          </div>
}
