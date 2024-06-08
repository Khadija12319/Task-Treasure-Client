import { useLoaderData } from "react-router-dom";
import bgimg from "../../assets/details.jpg";
import Countdown from 'react-countdown'
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import moment from "moment";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TaskDetails=()=>{
    const axiosSecure=useAxiosSecure();
    const tasks=useLoaderData();
    console.log(tasks);
    const completionDate = new Date(tasks.completion_date);
    const timeDiff = completionDate - Date.now();
    const {user}=useContext(AuthContext);
    const current_time=moment().date();
    
    const handleForm= (e) =>{
        e.preventDefault();
        const submission_details=e.target.details.value;
        const insertData={
            task_id:tasks._id,
            task_title:tasks.task_title,
            task_img_url:tasks.task_img_url,
            payable_amount:tasks.payable_amount,
            worker_email:user.email,
            submission_details:submission_details,
            worker_name:user.displayName,
            creator_name:tasks.creator_name,
            creator_email:tasks.creator_email,
            current_date:current_time,
            status:'pending'
        }
        console.log(insertData);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure to add the data?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Add it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/submissions',insertData)
            .then(res => {
                if(res.data.insertedId){
                    console.log('task added to the database'); 
               }
            })
            .catch()
              swalWithBootstrapButtons.fire({
                title: "Added!",
                text: "Your file has been Added to the Server.",
                icon: "success"
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled!",
                text: "Your information is not added)",
                icon: "error"
              });
            }
          });
    }

    return(
        <>
        <div>
        <div style={{ position: 'relative' }} className="mb-10">
          <img src={bgimg} alt="" className="w-full h-[500px]" style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
            <p className="text-white text-5xl font-extrabold bg-gray-800 bg-opacity-60 p-10 inline">Job Details</p>
          </div>
        </div>
            <div className="mx-14 flex mb-10">
                <div className="w-[70%] flex-1">
                    <h1 className="text-3xl mb-5 font-medium">{tasks.task_title}</h1>
                    <div className="bg-[#EDE8F5] h-72">
                    <p  className="text-3xl leading-8 p-5">Job Description : </p>
                        <p className="text-xl leading-8 p-5">{tasks.task_details}</p>
                    </div>
                    <div className="bg-[#EDE8F5] mt-10 p-5">
                        <form onSubmit={handleForm}>
                        <p className="text-3xl leading-8 mb-5">Enter The Required Proof Of Job Finished:</p>
                        <textarea type="text" name="details" className="w-full"/>
                        <p className="text-2xl my-3">{tasks.submission_info}</p>
                        <button className="text-center mx-auto btn btn-primary block text-xl">Request For Complete</button>
                        </form>
                    </div>
                </div>
                <div className="w-[30%] ml-6 bg-[#ADBBDA] p-4">
                    <h1 className="text-2xl font-medium">Job Information</h1>

                    <div className="p-4">
                        <img src={tasks.task_img_url} alt="" />
                        <div className="pt-4 pb-2">
                            <p className="text-xl font-medium pb-1">Created by: </p>
                            <p className="text-xl">{tasks.creator_name}</p>
                        </div>

                        <hr />

                        <div className="pb-2">
                            <p className="text-xl font-medium pb-1">Job Id:</p>
                            <p className="text-xl">{tasks._id}</p>
                        </div>

                        <hr />


                        <div className="pb-2">
                            <p className="text-xl font-medium pb-1">Job Coins:</p>
                            <p className="text-xl">{tasks.payable_amount}</p>
                        </div>

                        <hr />


                        <div className="pb-2">
                            <p className="text-xl font-medium pb-1">Job Vacancy:</p>
                            <p className="text-xl">{tasks.task_count}</p>
                        </div>

                        <hr />


                        <div>
                            <p className="text-xl font-medium pb-1">Job Will be Available till:</p>
                            <p className="text-xl">{tasks.completion_date}</p>
                        </div>

                        <div>
                        {timeDiff > 0 ? (
                <div className="text-center py-3">
                    <h2 className="text-2xl font-bold">Time Remaining</h2>
                    <Countdown
                        date={Date.now() + timeDiff} // Date to count down to
                        renderer={({ days,hours, minutes, seconds, completed }) => {
                            if (completed) {
                                // Render a message when countdown completes
                                return <p>Countdown expired</p>;
                            } else {
                                // Render the countdown timer
                                return (
                                    <span>
                                        {days} days {hours-6} hours {minutes} minutes {seconds} seconds
                                    </span>
                                );
                            }
                        }}
                    />
                </div>
            ) : (
                <p>Countdown expired</p>
            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
export default TaskDetails;