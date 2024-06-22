import Banner from "./Banner";
import Featured from "./Featured";
import TestimonialSection from "./TestimonialSection";
import TopEarners from "./TopEarners";
import WorkFlow from "./WorkFlow";

const Home = () =>{
    return(
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <WorkFlow></WorkFlow>
            <TopEarners></TopEarners>
            <TestimonialSection></TestimonialSection>
        </div>
    )
}
export default Home;