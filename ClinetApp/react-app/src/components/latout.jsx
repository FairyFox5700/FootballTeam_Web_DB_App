import Header from "../containers/header/header";

import React from "react";
import ReactFooter from "./footer";

const Layout =(...props)=>{
        return (
            <div>
                <Header />
                {props.children}
                <ReactFooter />
            </div>
        )
}
export  default  Layout;