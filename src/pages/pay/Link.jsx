import { useDebugValue, useEffect, useRef, useState } from "react";
import { Link, Route, useRoute } from "wouter";
import project from "@/libs/project";
import helpers from "../../libs/helpers";
let qrcode = false
import('../../libs/qrcode.min').then(q=>qrcode=q)


export default (props)=>{  
  let pr =  project(s=>({ 
                          user:           s.user, 
                          getUnusedAddress:s.getUnusedAddress,
                          addAlert:       s.addAlert,
                          storeProfileGet:s.storeProfileGet, 
                          lastPrices:     s.lastPrices,
                          lastPricesGet:  s.lastPricesGet,
                          getAddressTx:   s.getAddressTx
                        }))
  console.log(props.params.slug)
  const [usp, uspSet]               = useState({
      store: '0', 
      product: 'Page is loading', 
      price: '0', 
      fiat: 'USD', 
      Kode: ''})
  const [lastPrices,lastPricesSet]  = useState([])
  const [coins,     coinsSet]       = useState()  
  const [coinTx,    coinTxSet]      = useState([])  
  const [coinTxT,   coinTxTSet]     = useState([])  
  const [profile,   profileSet]     = useState({CompanyName:"Loading",Logo:"",Description:"My Store",createdAt:"2022-11-27T11:55:55.015Z",updatedAt:"2022-11-27T11:55:55.015Z"});

  let canvas = useRef()
  useEffect(()=>{
                  if(usp.store && coins)
                    pr.getAddressTx(usp.store ,  coins)
                      .then(r=>{coinTxSet(r.data); pr.addAlert('checked')})
                }, [coinTxT])

  useEffect(()=>{
      if(props.params.slug){
      fetch(`/payment/slug?slug=${props.params.slug}`).then(r=>r.json()).then(r=>{console.log(r, usp);
        if(r.err)
          return pr.addAlert(r.err)

      let txCoeffs = {USDT:1, ETH:1e-9, BTC:1e-8}
      if(txCoeffs.hasOwnProperty(r.data.fiat.toUpperCase()))
        r.data.price *= txCoeffs[r.data.fiat.toUpperCase()]
      console.log(' ******* ', r.data.fiat, r.data.fiat.toUpperCase(), txCoeffs)
      uspSet( {...r.data, store:r.data.userId} )} )
      if(!pr.lastPrices || !pr.lastPrices.length)
        pr.lastPricesGet()
      let intHandle = setInterval(()=>coinTxTSet(c=>c+1), 10000 )
      return ()=>clearInterval(intHandle)
      }
    }, [])
  useEffect(()=>{
      let store = parseInt(usp.store)
      if(store){
        pr.getUnusedAddress(store, r=>{
            coinsSet(r.data);
            console.log(qrcode)
            qrcode&&qrcode.default({}).toCanvas(canvas.current, `0x${r.data.replace('0x', '')}`, e=> {
              if (e) return console.error('canvas error', e)
              console.log('canvas success!');
              } )
            }
          )
        pr.storeProfileGet(store).then(p=>{
          if(p.err)
            return pr.addAlert(p.err); 
          profileSet(p.data)
        })
      }
  }, [usp])
  
    return <div className="page-payButton">
      <h2>{profile.CompanyName}</h2>
      <div className="specialPlace">
      <h3>{usp.product}</h3>
      <div className="priceSection">
        <div className="pricePlace">
          <div className="price">{usp.price}</div>
          <div className="fiat">{usp.fiat}</div>
        </div>
      {(usp.fiat != 'eth')&&
        <div className="pricePlace">
          <div className="price">{usp.price* helpers.FiatTranspose(pr.lastPrices, usp.fiat, 'eth' )}</div>
          <div className="fiat">Eth</div>
        </div>
      }
      </div>
      <h3>Payment options</h3>
      <div className="PaymentOptionsSection">
        <div>{coins}</div>
        <div>Eth</div>
        <canvas ref={canvas}></canvas>
      </div>
      <div className="statuses">
        <h3>
          Coin Transactions
        </h3>
        <div className="statusesHeader">
          <div>BlockNo</div>
          <div>Balance</div>
        </div>
        { coinTx.map(e=>
              <div key={e.id}>
                <div>{e.blockNo}</div>
                <div>{e.balance}</div>
                <div>{e.coin}</div>
              </div>)
              }
      </div>
      </div>
      </div>


}; 
