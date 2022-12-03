import React from "react";
import ConnectPeople from "./ConnectPeople";
import Sidebar from "./Sidebar";

import "../../sass/layout.scss";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            {children}
            <ConnectPeople />
        </div>
    );
};

export default Layout;
