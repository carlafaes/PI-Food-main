import React from "react";
import { Link } from "react-router-dom";
import video from './img/landingvideo2.mp4';
import './styles/LandingPage.css';


export default function Landing(){
    return(
        <div className="container_landing">
            <video className="video" autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
            {/* <div>
                <h1 >
                    <span className="title">
                        Welcome to the Food app
                    </span>
                </h1>
            </div> */}

            <Link to='/home'>
                <button className="buttonEnter">
                    Enter
                </button>
            </Link>
        </div>
    )
}