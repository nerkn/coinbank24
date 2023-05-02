import { useEffect, useState }  from 'react'
import { Route, Switch }        from "wouter";
import Nav                      from '@/components/nav'
import project                  from "@/libs/project"; 
import Home                     from '@/pages/Home' 
import Pages                    from '@/pages/Pages';
import Profile                  from '@/pages/Profile';
import PayButton                from '@/pages/pay/Button';
import PayLink                  from '@/pages/pay/Link';
import TransactionAlert         from '@/pages/TransactionAlert';
import HowToGetPayment          from '@/pages/HowToGetPayment';
import MakePayment              from '@/pages/MakePayment';
import Footer                   from '@/components/footer'


function App() {

  const [count, setCount] = useState(0)
  let pr =  project(s=>({project:s.project, lastPricesGet:s.lastPricesGet, 
                         load:s.load }))
  useEffect(()=>{
    document.title=pr.project.name; 
    pr.load();
    pr.lastPricesGet() 
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-155XFMJK8P');
    console.log('gtag calisti')
  
  
  
  },[])
  return (<>
    <div className="App">
      <Nav />
      <Route path="/"><Home /></Route>
      <Route path="/about">About Us</Route>
      <Route path="/profile" component={Profile} />
      <Route path="/TransactionAlert"><TransactionAlert /></Route>
      <Route path="/HowToGetPayment"><HowToGetPayment /></Route>
      <Route path="/MakePayment"><MakePayment /></Route>
      <Route path="/:page*"       component={Pages} /> 
      <Switch>
        <Route path="/pay"        component={PayButton} />
        <Route path="/pay/:slug"  component={PayLink} />
      </Switch>
      <Footer />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-155XFMJK8P"></script> 
    </div>

    </>
  )
}

export default App
