import { useContext } from "react";
import { AuthContext } from "../../Context/Context";

const User= () =>{
    const {user} = useContext(AuthContext);
    return (
        <div className="container mx-auto my-20">
            <div className="lg:w-3/4 lg:mx-auto mx-2 md:h-80 md:p-0 p-5 border rounded-xl" data-aos="fade-down" data-aos-duration="2000">
                <div className="flex md:flex-row flex-col gap-10 items-center justify-center h-full">
                    <div className="items-center flex-1 justify-center flex">
                        <img src={user?.photoURL} alt="" className="h-64 w-64 rounded-full"/>
                    </div>
                    <div className="space-y-4 pr-8 flex-1">
                        <h2 className="md:text-3xl text-xl font-bold">Name: <span className="font-medium md:text-2xl">{user?.displayName}</span></h2>
                        <h2 className="md:text-3xl text-xl font-bold">Email: <span className="font-medium md:text-2xl">{user?.email}</span></h2>
                        <h2 className="md:text-3xl text-xl font-bold">Photo Url: <span className="font-medium md:text-2xl max-w-xs break-all">{user?.photoURL}</span></h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;