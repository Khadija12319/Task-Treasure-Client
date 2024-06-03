import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { ResetTv } from "@mui/icons-material";

const Register= () =>{
    const axiosPublic = useAxiosPublic();
    const {createUser,logInGoogle,user} = useContext(AuthContext);
    const [users ,setUser] = useState(null);
    const [registerError, setRegisterError] =useState(null);
    const [emailError,setEmailError] =useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const formData = new FormData(e.target); 
        console.log(formData);
        const email= formData.get('email');
        const password =formData.get('password');
        const role=formData.get('role');
        setRegisterError(null);
        setEmailError(null);


        const isValidEmail= /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!isValidEmail){
            setEmailError("Invalid email format");
        }

        const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        if(password.length <8){
            setRegisterError("Password should be at least 8 character or long");
            return;
        }else if(!isValidPassword)
        {
            setRegisterError("Password must include an uppercase letter, a lowercase letter, a number, and a special character.");
            return;
        }
        const name =formData.get('name');
        const photoURL =formData.get('photo');
        const coins = role === 'worker' ? 10 : 50;


        if (email && password) {
            // Create user
            createUser(email, password)
            .then(result => {
               const resUser= result.user;
               setUser(resUser);
               updateProfile(resUser,{displayName:name,
            photoURL:photoURL})
            .then(()=> {
                const userInfo= {
                     name:name,
                     email:email,
                     photo:photoURL,
                     role:role,
                     coins:coins
                }
                axiosPublic.post('/users',userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        console.log('user added to the database'); }
                })
                .catch()
            })
            .catch()
               console.log(resUser);
               notifySuccess("User created successfully");
               setTimeout(() => {
                navigate(location?.state ? location.state : '/');
            }, 2000);
            })
            .catch(error => {
                console.log("Error creating user:", error);
                setRegisterError(error.message);
            });
        } }

        const handleGoogleLogin = () => {

            // Sign in with Google
            logInGoogle()
            .then(result => {
                const resUser= result.user;
                const userInfo={
                    email:resUser.email,
                    name:resUser.displayName,
                    photo:resUser.photoURL,
                    role:'worker',
                    coins:10
                }
                axiosPublic.post('/users',userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        console.log('user added to the database'); }
                })
                .catch()
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
        <div className="bg-[#ADBBDA] h-fit py-20 overflow-hidden">
            <div className="w-4/5 mx-auto bg-[#EDE8F5] rounded-3xl">
                <div className="flex items-center justify-center gap-10">
                    <div className="flex-1">
                        <img src="https://i.ibb.co/cFSxYyH/5165290.jpg" alt="" className="h-[925px] rounded-3xl"/>
                    </div>
                    <div className="flex-1">
                        <div className="py-10">
                        <h1 className="text-5xl font-bold pb-4 text-black">Register</h1>
                        <p className="text-lg pb-8">Please complete to create your account</p>
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-col pb-3">
                                <label className="text-black font-medium text-lg pb-2 pl-1">Name</label>
                                <input type="text" name="name" placeholder="Enter Your Name" className="w-[80%] px-5 py-3 rounded-xl" required/>
                            </div>
                            <div className="flex flex-col pb-3">
                                <label className="text-black font-medium text-lg pb-2 pl-1">Email</label>
                                <input type="email" name="email" placeholder="Enter Your Email" className="w-[80%] px-5 py-3 rounded-xl" required/>
                                {
                        emailError && <p className="text-red-500">{emailError}</p>
                    }
                            </div>
                            <div className="flex flex-col pb-3">
                                <label className="text-black font-medium text-lg pb-2 pl-1">Photo URL</label>
                                <input type="text" name="photo" placeholder="Your Photo Url" className="w-[80%] px-5 py-3 rounded-xl" required/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-black font-medium text-lg pb-2 pl-1">Password</label>
                                <input required type={showPassword ? "text" : "password"} name="password" placeholder="password" className="w-[80%] px-5 py-3 rounded-xl" />
                    <span onClick={ () => setShowPassword(!showPassword)} className="md:translate-x-[85%] translate-x-[80%] -translate-y-[35px] text-2xl w-[80%] px-5 rounded-xl">{showPassword? <IoEyeOff className="text-black"/> : <IoEye className="text-black"/>}</span>
                    {
                        registerError && <p className="text-red-500">{registerError}</p>
                    }
                            </div>
                            <div className="flex flex-col pb-3">
                                 <label className="text-black font-medium text-lg pb-2 pl-1" name="role" >Role</label>
                                <select className="border w-[80%] px-5 py-3 rounded-xl" name="role">
                                  <option value="worker" name="worker">Worker</option>
                                  <option value="taskCreator" name="taskCreator">Task Creator</option>
                                </select>
                            </div>
                            <button className="bg-[#ADBBDA] px-4 py-2 text-black font-bold ml-2 mt-2 rounded-xl">SIGN UP</button>
                            <div className="mb-4">
                        <p className="text-center">Already have an account? <Link to='/login' className="text-black underline">Login now</Link></p>
                    </div>

                            <div className="divider mr-10">OR</div>

                        <div className="flex justify-center">
                        <button className="py-3 px-6 mr-10 flex items-center justify-center bg-[#ADBBDA] text-black font-bold" onClick={handleGoogleLogin}><FcGoogle className="text-3xl"/>Sign In With Google</button>
                        </div>
                        </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;