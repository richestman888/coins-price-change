import {React} from 'react'
import DateTime from './DateTime.jsx'
import Topbanner from './Topbanner.jsx'
import Dashboard from './Dashboard.jsx'
// import IPConnectionChecker from './IPConnectionChecker.js';
import './App.css'

const App = () => {
    return (
        <>
            <div style={{ display: 'flex'}}>
                <div className="Topbanner">
                    <Topbanner />
                </div>
                <div className="Topbanner-time">
                    <DateTime />
                    {/* <IPConnectionChecker /> */}
                </div> 
            </div>   
            <div style={{ display: 'flex'}}>
                <Dashboard />
            </div>
        </>
    )
}

export default App