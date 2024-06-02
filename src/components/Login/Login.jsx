import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login= () =>{
    const {logInUser,logInGoogle} = useContext(AuthContext);
    const [user ,setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] =useState(null);

    const handleLogin = e => {
        e.preventDefault();
        setLoginError(null);
        const formData = new FormData(e.target); 
        console.log(formData);
        const email= formData.get('email');
        const password =formData.get('password');


        logInUser(email,password)
        .then(result => {
            const resUser= result.user;
            setUser(resUser);
            notifySuccess("User Log In successfully");
            setTimeout(() => {
                navigate(location?.state ? location.state : '/');
            }, 2000);
        })
        .catch(error => {
            setLoginError(error.message);
        })
    }
        const handleGoogleLogin = () => {
            // Sign in with Google
            logInGoogle()
            .then(result => {
                const resUser= result.user;
               setUser(resUser);
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.log("Error signing in with Google:", error);
            });
        }

        const notifySuccess = (message) => {
            toast.success(message, {
                position: "top-right",
                autoClose: 3000, // 3 seconds
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: "#DD6B20",
                    color: "#FFF",
                },
                bodyClassName: "text-lg",
                toastClassName: "rounded-lg",
            });
        };

    return(
        <>
            <div className="bg-[#ADBBDA] h-fit py-20">
            <div className="w-4/5 mx-auto bg-[#EDE8F5] rounded-3xl">
                <div className="flex items-center justify-center">
                    <div className="flex-1">
                        <div className="py-10 pl-10">
                        <h1 className="text-5xl font-bold pb-4 text-black">Login</h1>
                        <p className="text-lg pb-8">Please Login to access interesting features of this website</p>
                        <form onSubmit={handleLogin}>

                            {/* email */}
                            <div className="flex flex-col pb-3">
                                <label className="text-black font-medium text-lg pb-2 pl-1">Email</label>
                                <input type="email" name="email" placeholder="Enter Your Email" className="w-[80%] px-5 py-3 rounded-xl" required/>
                            </div>

                            {/* password */}
                            <div className="flex flex-col pb-3">
                                <label className="text-black font-medium text-lg pb-2 pl-1">Password</label>
                                <input required type={showPassword ? "text" : "password"} name="password" placeholder="password" className="w-[80%] px-5 py-3 rounded-xl" />
                    <span onClick={ () => setShowPassword(!showPassword)} className="md:translate-x-[85%] translate-x-[80%] -translate-y-[35px] text-2xl w-[80%] px-5 rounded-xl">{showPassword? <IoEyeOff className="text-black"/> : <IoEye className="text-black"/>}</span>
                    {
                        loginError && <p className="text-red-500">{loginError}</p>
                    }
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover text-lg text-black">Forgot password?</a>
                    </label>
                            </div>

                            
                            <button className="bg-[#ADBBDA] px-4 py-2 text-black font-bold ml-2 mt-2 rounded-xl">SIGN IN</button>
                            <div className="mb-4">
                        <p className="text-center">Don't have an account? <Link to='/register' className="text-black underline">Register now</Link></p>
                    </div>

                            <div className="divider mr-10">OR</div>

                        <div className="flex justify-center">
                        <button className="py-3 px-6 mr-10 flex items-center justify-center bg-[#ADBBDA] text-black font-bold" onClick={handleGoogleLogin}><FcGoogle className="text-3xl"/>Sign In With Google</button>
                        </div>
                        </form>
                        </div>

                    </div>
                    <div className="flex-1">
                        <img src="https://i.ibb.co/Vgvzc97/computer-security-with-login-password-padlock.jpg" alt="" className="h-[650px] rounded-3xl"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;