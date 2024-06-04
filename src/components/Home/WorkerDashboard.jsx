import { NavLink, Outlet } from "react-router-dom";

const WorkerDashboard=() =>{
    return(
        <>
            <div className="flex h-full">
                <div className="w-64 min-h-[100%] bg-blue-600">
                    <ul className="menu">
                        <li><NavLink to='/workerdashboard/workerhome'>Home</NavLink></li>
                    </ul>
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
export default WorkerDashboard;