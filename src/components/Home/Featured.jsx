import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import { MdNotificationsActive, MdReport, MdTask } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiAurelia } from "react-icons/si";

const Featured = () => {
    return(
        <div className="bg-[#EDE8F5] pb-20">
            <div>
                <HomeTitle 
                title="Key Features" 
                para="From seamless task engagement to comprehensive management tools, our platform is designed to meet the diverse needs of Workers, Task-Creators, and Admins, ensuring a streamlined and rewarding experience for everyone involved."
                />
            </div>
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-10">

                    <div className="flex gap-6 bg-[#8697C4] h-[170px] p-5 shadow-md rounded-2xl">
                        <div className="flex justify-center items-center">
                            <MdTask className="text-5xl"/>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl font-semibold">Earn Coins by Completing Tasks</h1>
                            <p>Workers can earn coins by completing various tasks posted on the platform, providing a rewarding and engaging experience.</p>
                        </div>
                    </div>

                    <div className="flex gap-6 bg-[#8697C4] h-[170px] p-5 shadow-md rounded-2xl">
                        <div className="flex justify-center items-center">
                            <MdManageAccounts className="text-5xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl font-semibold">Create and Manage Tasks</h1>
                            <p>Task-Creators have the ability to create, manage, and review tasks efficiently, ensuring smooth operation and quality control.</p>
                        </div>
                    </div>

                    <div className="flex gap-6 bg-[#8697C4] h-[170px] p-5 shadow-md rounded-2xl">
                        <div className="flex justify-center items-center">
                            <RiSecurePaymentLine className="text-5xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold">Secure Payments</h1>
                        <p>Our platform ensures secure and reliable payments, giving users confidence in the transactions they make.</p>
                        </div>
                    </div>

                    <div className="flex gap-6 bg-[#8697C4] h-[170px] p-5 shadow-md rounded-2xl">
                        <div className="flex justify-center items-center">
                            <MdNotificationsActive className="text-5xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl font-semibold">Notification System</h1>
                            <p>Stay informed with real-time notifications for task updates, approvals, and other important activities, keeping you engaged and aware.</p>
                        </div>
                    </div>

                    <div className="flex gap-6 bg-[#8697C4] h-[170px] p-5 shadow-md rounded-2xl">
                        <div className="flex justify-center items-center">
                            <MdReport className="text-5xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl font-semibold">Report System for Invalid Submissions</h1>
                            <p>Easily report invalid submissions, ensuring the integrity and quality of tasks, while allowing admins to take proper actions against invalid activities.</p>
                        </div>
                    </div>

                    <div className="flex gap-6 bg-[#8697C4] h-[170px] p-5 shadow-md rounded-2xl">
                        <div className="flex justify-center items-center">
                            <SiAurelia className="text-5xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl font-semibold">Role-Based Authorization</h1>
                            <p>Implementing secure role-based authorization to ensure users have the appropriate access and permissions, enhancing the overall security of the platform.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Featured;