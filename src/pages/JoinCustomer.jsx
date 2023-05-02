import { Link, Route } from "wouter";
import project from "../libs/project";

export default ()=>{
  let pr =  project(s=>({user:s.user }))
return <div className="pages-index">
        <h3 className="">Cause you need <br /><b>Crypto</b></h3>
        <p> Regular payment is <br/> <s>slow</s> <s>cumbersome</s> <br /> <s>expensive</s> <s>hard</s> <br /> <s>complex</s> <s>bureaucratic</s> 
        </p>
        <img src='/i/accept cyrpto.webp' /> 
      </div>
}
    
    