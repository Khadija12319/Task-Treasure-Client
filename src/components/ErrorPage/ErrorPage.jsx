import { Link } from "react-router-dom"
import "../../App.css"
function ErrorPage(){
    return (
        <>
        <div className="errorpage">
            <div className="flex flex-col items-center justify-center h-[100vh] space-y-3">
                <h1 className="text-5xl text-white font-extrabold">Oops!</h1>
                <p className="text-3xl text-white font-extrabold">404 - Page ot found!</p>
                <p className="text-xl font-medium text-white">This page you are looking for might have been removed, had its name changed or is temporarily unavailable</p>
                <Link to="/" className="bg-white text-orange-700 px-3 py-2 rounded-2xl text-2xl font-semibold"><button>Go to HomePage</button></Link>
            </div>
        </div>
        </>
    )
}

export default ErrorPage