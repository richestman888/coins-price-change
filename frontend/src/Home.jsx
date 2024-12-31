import {React} from 'react'
import DateTime from './DateTime'
import Topbanner from './Topbanner'
import Dashboard from './Dashboard'
// import IPConnectionChecker from './IPConnectionChecker.js';
import './App.css'

const Home = () => {
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

export default Home