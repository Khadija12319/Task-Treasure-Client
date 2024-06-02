import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import "../../App.css"
const Banner = () =>{
    return(
        <div>
            <Carousel className="text-center h-[800px] bg-[#EDE8F5]" ariaLabel={false}>
                <div className="slide-container">
                    <img src="https://i.ibb.co/nDQmpz0/portrait-woman-desk-working-with-laptop-late-night.jpg" />
                    <div className="slide-content">
                        <h2>Worker can work anytime</h2>
                        <p>Workers get's various service like task assessment, login, registration</p>
                    </div>
                </div>
                <div className="slide-container">
                    <img src="https://i.ibb.co/r5rWwJq/young-businesswoman-face-mask-standing-office-holding-clipboard-with-documents.jpg" />
                    <div className="slide-content">
                        <h2>Everyday new task added</h2>
                        <p>Task creator creates task for workers and evaluate the tasks submitted by worker.</p>
                    </div>
                </div>
                <div className="slide-container">
                    <img src="https://i.ibb.co/ZYw3nhj/woman-4783150-1280.jpg" />
                    <div className="slide-content">
                        <h2>Earn Money</h2>
                        <p>Earn money by completing tasks</p>
                    </div>
                </div>
                <div className="slide-container">
                    <img src="https://i.ibb.co/1dmV51p/notes-6399119-1280.jpg" />
                    <div className="slide-content">
                        <h2>User experience and updated technology</h2>
                        <p>User can enjoy the dynamic interacting website with great user experience</p>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}
export default Banner;