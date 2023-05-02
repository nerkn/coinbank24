import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import project from "@/libs/project";
import helpers from "@/libs/helpers";

export default (props)=>{
  let pr =  project(s=>({ 
                          user:s.user, 
                          addAlert:s.addAlert,
                          getCoins:s.getCoins,
                          profileGet:s.profileGet,
                          profileSet:s.profileSet,
                          paramsGet :s.paramsGet,
                          paramsSet :s.paramsSet
                         }))
  const [profile, profileSet] = useState({CompanyName:"Loading",Logo:"",Description:"My Store",createdAt:"2022-11-27T11:55:55.015Z",updatedAt:"2022-11-27T11:55:55.015Z"});
  let refs={
    CompanyName:useRef(),
    Logo:useRef(),
  }

  const [ coins, setCoins ]= useState()
  const [ params, paramsSet ]= useState()
  const [ updateState, updateStateSet ]= useState(1)

  function updateProfile(){ 
    if(pr.user.role=='guest')
      return;
    pr.profileGet().then(p=>{
      if(p.err)
        return pr.addAlert(p.err); 
      profileSet(p.data)
    })

  }
  useEffect(()=>{
    updateProfile(); 
    pr.getCoins().then(p=>{
      if(p.err)
        return pr.addAlert(p.err)
      setCoins(p.data)
    })
    pr.paramsGet()?.then(p=>{
      if(p.err)
        return pr.addAlert(p.err);
      if(!('defaultAddress' in p.data))
        p.data.defaultAddress = false;
      paramsSet(p.data)
      })  
    }, [pr.user, updateState])

    function selectDefault(e, address){
      e.preventDefault()
      pr.paramsSet({param:'defaultAddress', value:address}).then(r=>updateStateSet(updateState+1))
    }
  function formSubmit(e){    
    if(e.target.elements.Logo.value)
      return;
    e.preventDefault();
    pr.profileSet([...e.target.elements]
                      .reduce( (a,e)=>{a[e.name]=e.value; return a},{})
                ).then(r=>{
                  if(r.err) 
                    return pr.addAlert(r.err); 
                  pr.addAlert(r.msg)
                  updateProfile();
                  })
  }
  return <div className="pages-Profile">
    <h2>{profile.CompanyName}</h2>
    <form className="pricePlace" onSubmit={formSubmit} action='/user/CB24PaymentProfile' method="Post" enctype="multipart/form-data">
      <div className="CompanyName">
        <label htmlFor="CompanyName" >Company Name</label>
        <input name="CompanyName" value={profile.CompanyName} onChange={e=>profileSet({...profile, CompanyName:e.target.value})} />
      </div>
      <div className="Logo">
        <label htmlFor="Logo" >Logo</label>
        <input name="Logo" type='file' accept="image/*"  />
        <img src={profile.Logo} />
      </div>
      <div className="Description">
        <label htmlFor="Description" >Description</label>
        <textarea name="Description" value={profile.Description} 
         onChange={e=>profileSet({...profile, Description:e.target.value})}/>
      </div>
      <div className="Save">
        <input value="Save" type='submit' />
      </div>
    </form>
    <div className="coinPlace">
      <h3>Choose default address</h3>
      <p>When you receive payment we will send coins to this address.</p>
    {coins?.map(c=><div key={c.id} className="coin" >
          <div>{(c.address==params?.defaultAddress)?"Default":''}</div>
          <div>{c.coin}</div>
          <div className="monospace">{c.address}</div>
          <div>{c.balance}</div> 
          <div><a href='#' title="Make this default address" onClick={(e)=>selectDefault(e, c.address)} className="button">Select</a> </div>
          </div>)}

    </div>
    </div>


};