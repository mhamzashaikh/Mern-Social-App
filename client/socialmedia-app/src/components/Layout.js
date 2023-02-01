import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
    return (
        <>
            <Navbar />
            <div style={{ display: "flex" }}>
                <Leftbar />
                <div style={{ flex: "6" }}>
                    <Outlet />
                </div>
                <Rightbar />
            </div>
        </>
    )
}

export default Layout;