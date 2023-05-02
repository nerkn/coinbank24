import project from "../libs/project"


export default ()=>{
  let alerts = project(s=>s.alerts)
  console.log(alerts)
  return  <div className="alertPlace fixed top-0   right-0" >
    {alerts.map(a=> <div className="alert alert-error shadow-lg z-50">
                        <div>
                            <span>{a}</span>
                        </div>
                    </div>
    )}
            </div>
}