import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import HowItWorks from "./HowItWorks";

const WorkFlow= () => {

    const {user}=useContext(AuthContext);
    console.log(user);

    return(
        <div className="bg-[#EDE8F5]">
            <div className="container mx-auto">
                <div>
                    <HomeTitle title="How it Works" para="These steps are the roadmap to earn money through completing task and getting reward. Sell the reward coins and get money from this."></HomeTitle>
                </div>
                <HowItWorks></HowItWorks>
            </div>
        </div>
    );
}

export default WorkFlow;