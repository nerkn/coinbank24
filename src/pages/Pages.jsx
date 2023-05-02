import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import project from "../libs/project";

let  ComponentRender=(comps, pr)=>{
  let elem = <div key={comps.id}  dangerouslySetInnerHTML={{  __html: comps.code }} />
  let f = ()=>{};
  if(comps.exec){
    console.log('eeeeeeeeeeeeeeee', comps.exec)
    f = new Function("comps", "elem", comps.exec )  
    }
  return [elem, f];
}


export default ({params})=>{
  let pr = project(s=>({projectGet:s.projectGet, project:s.project, lastPrices:s.lastPrices})) 
  const [location, setLocation] = useLocation();
  //console.log('pages/Pages', params.page, pr.project.pages)
  let [page, pageSet] = useState([<></>])
  pr.projectGet();
  useEffect(()=>{
    console.log('pages/Pages default', params.page, location )
    let thispage = params.page?params.page:''
    let pages = pr.project.pageComponents.filter(
      e=>(`/${thispage}`== e.url  ))
    pageSet(pages.map(p => ComponentRender(p))) 
  },[pr.project.pages, location])

  useEffect(()=>{
    page.forEach(p=>{ if(!p[0] ) return; console.log('useEffect ici', p, pr);  p[1](pr, p[0])})
  }, [page, pr.lastPrices] )

  if(0 && (!params.page))
    return <>Empty</>;

return <div className="pages-pages">
  {page.map(p=>p[0])}
      </div>
}
    
    