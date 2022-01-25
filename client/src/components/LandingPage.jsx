import React from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return(
        <div>
            <div>
                <h1>
                    <span>
                        Welcome to the Food app
                    </span>
                </h1>
            </div>

            <Link to='/home'>
                <button>
                    Enter
                </button>
            </Link>
        </div>
    )
}