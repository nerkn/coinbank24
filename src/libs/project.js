
import create from "zustand";
import h from "./helpers"


let state =  create((set,get)=>({
  servingDomain : 'http://localhost:3330',
  user          : {username:'guest', role:'guest', email:''},
  profile       : {},
  count         :0, increment:()=>set(s=>({count : s.count++})),
  project       : {
                  loading:false, fresh : false, 
                  id: 0, "name": "Coin Bank 24", "categories": [],
                  "pages": [ {"id": 17, "url": "/", "status": "Published", "projectId": 4        }    ],
                  "pageComponents": [{  "id": 35,    "code": " ",    "pageId": 17,    "orderby": 999,
                  "exec": "",    "url": "/" }    ]},
  lastPrices    : [],
  lastPricesGet : ()=>fetch(`/api/lastPrices`)
                      .then(r=>r.json())
                      .then(r=>set({lastPrices:r})),
  getCoins      : ()=>fetch(`/user/userCoins`,
                        {method:'POST' })
                      .then(r=>r.json()),
  defaultAddressGet:(store)=>h.fetch('/payment/defaultAddressGet',{store:store}).then(r=>r.json()),
  getUnusedAddress :(store, cb)=>{
                    let gua =  localStorage.getItem('getUnusedAddress')
                    if(gua){
                      gua = JSON.parse(gua)
                      if(gua[store])
                        return cb(gua[store]);
                    }else{
                      gua=[];
                    }
                    h.fetch('/payment/getUnusedAddress',{store:store}).then(r=>r.json()).then(r=>{
                      gua[store] = r;
                      localStorage.setItem('getUnusedAddress', JSON.stringify(gua))
                      cb(r)
                    })
                    },
  getAddressTx: (store, address)=>fetch(`/payment/getAddressTx?store=${store}&address=${address}`).then(r=>r.json()),
  removeAddress : (setCoins)=>(address)=>(event)=>{
                  event.preventDefault();
                  if(!confirm('Delete this address ?? '))
                    return;
                  fetch(`/user/removeAddress`,
                          {method:'POST',
                           headers: {
                            'Content-Type': 'application/json'},
                             body:JSON.stringify({address:address}) })
                        .then(r=>r.json())
                        .then(r=>setCoins(r.data))},
  addAddress : (setCoins, coin, address, key)=>{                  
                  fetch(`/user/addAddress`,
                          {method:'POST',
                            headers: {
                            'Content-Type': 'application/json'},
                              body:JSON.stringify({coin:coin, address:address, key:key}) })
                        .then(r=>r.json())
                        .then(r=>setCoins(r.data))},
  projectGet    : async ()=>{
                  //console.log('libs/project projectGet',  get().project, get().user )
                  if(get().project.loading || get().project.fresh)
                      return get().project;
                      get().project.loading = true;
                  let r = fetch(`/site/info`).then(r=>r.json())
                        .then(r=>{
                          r.loading=false;
                          r.fresh = true; 
                          set({project:r});
                          console.log(r, 'project guncellendi');  
                          return r;
                          })
                  return await r;
                        },
  renderPage    :()=>"kedi",
  userlogin     : async (email, pass)   => 
                await fetch(`/user/login?email=${email}&pass=${pass}&project=${get().project.id}`)
                  .then(j=> j.json())
                  .then(j=>{if(j.error){
                  get().addAlert(j.error)
                }else{
                  console.log('user/login', j)
                  set(s=>({user:{
                       username:j.username, 
                       email:j.email, 
                       role:j.role,
                        id:j.id}}))
                  get().save();
                  document.querySelector('#userLoginForm').checked =false
                } }
        ) ,
  logOut        : ()    => {
                set(s   => ({ user: {username:'guest', role:'guest', email:''}}))
                get().save();
                            },
  alerts        : [],
  addAlert      : (text, timing=2000)=>{
                        set( s=>({alerts:[...s.alerts, text]}) ); 
                        setTimeout( () => set(s=>{
                              const newAlerts = s.alerts.slice(1)
                              console.log("timing outing is  ", newAlerts)
                              return { alerts: newAlerts }  
                              }), 
                              timing );} ,

  save          : ()=>{
                        console.log(JSON.stringify(get().user))
                        localStorage.setItem('user', JSON.stringify(get().user))
                      },
  load          : ()=>{
                        let user =  localStorage.getItem('user')
                        if(!user)
                          return;
                        set({user:JSON.parse(user)})
                      },
  getSlug       : async (requestedSlug='')=>
                await fetch(`/payment/getSlug?requestedSlug=${requestedSlug}`)
                          .then(r=>r.json())
                          .then(r=>r.slug),
  getPaymentLinks: async ()=>
                await fetch(`/payment/PaymentLinks`)
                          .then(r=>r.json()),
  profileGet:            ()=> fetch('/user/CB24PaymentProfile').then(r=>r.json()),
  storeProfileGet:  (store)=> fetch(`/user/storeProfile?store=${store}`).
                                    then(r=>r.json()),
  profileSet:        (data)=> h.fetch('/user/CB24PaymentProfile', data),
  paramsGet :            ()=>fetch('/user/Parameters').then(r=>r.json()),
  paramsSet :        (data)=> h.fetch('/user/Parameters', data),






  }),
 )
window.reactState = state;
export default state;