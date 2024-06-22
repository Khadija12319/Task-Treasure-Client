import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";
import moment from "moment";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddTask =() =>{
    const {user}=useContext(AuthContext);
    const [coins,refetch]= useAxiosCoins();
    const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api= `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [uploadError,setUploadError]=useState();
    const [creator_name,setCreatorName]=useState();
    const [creator_email,setCreatorEmail]=useState();
    const [coin,setCoin]=useState();
    const [userId,setUserId]=useState();
    useEffect(() => {
        if (user) {
          refetch(); // Fetch coins data when user is logged in
        }
      }, [user, refetch]);

      useEffect(() => {
        if (coins && coins.length > 0) {
          const coinData = coins[0]; // Access the first element of the coins array
          setCreatorName(coinData.name);
          setCreatorEmail(coinData.email);
          setCoin(coinData.coins);
          setUserId(coinData._id);
        }
      }, [coins]);
      

    const handleForm = async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);

        const task_title = formData.get('task_title');
        const task_details=formData.get('task_details');

        const count = formData.get('quantity');
        const task_count=parseInt(count);
        const amount=formData.get('payable_amount');
        const payable_amount=parseInt(amount);


        const completion_date = formData.get('completion_date');
        const submission_info=formData.get('submission_info');

        const photoFile =formData.get('task_image');
        let task_img_url = '';
        if (photoFile) {
            try {
                const formData = new FormData();
                formData.append('image', photoFile);
                const res = await axiosPublic.post(image_hosting_api, formData);
                task_img_url = res.data.data.display_url;
            } catch (error) {
                setUploadError("Failed to upload image");
                return;
            }
        }
        const current_time=moment().format('LTS');

        const formdata=
        {task_title:task_title,
        task_details:task_details,
        task_count:task_count,
        payable_amount:payable_amount,
        completion_date:completion_date,
        submission_info:submission_info,
        task_img_url:task_img_url,
        creator_name:creator_name,
        creator_email:creator_email,
        current_time:current_time};

        const points=parseInt(task_count*payable_amount);

        if(points>coin)
            {
                alert("Not available Coin. Purchase Coin");
            }
            else {
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
                }).then(async (result) => { // Make the callback function async
                  if (result.isConfirmed) {
                    try {
                      const res = await axiosSecure.post('/tasks', formdata);
                      if (res.data.insertedId) {
                        console.log('Task added to the database');
                        if (userId) {
                          const newCoins = parseInt(coin - (task_count * payable_amount)); // Correct points calculation
                          const point = { coins: newCoins };
                          const updateRes = await fetch(`https://assignment-12-server-ebon.vercel.app/users/${userId}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(point)
                          });
                          const data = await updateRes.json();
                          console.log(data);
                          refetch();
                        }
                      }
                      swalWithBootstrapButtons.fire({
                        title: "Added!",
                        text: "Your file has been Added to the Server.",
                        icon: "success"
                      });
                    } catch (error) {
                      console.error('Error:', error);
                      swalWithBootstrapButtons.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again later.",
                        icon: "error"
                      });
                    }
                  } else if (
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
              
        
    }
    return(
        <>
            <div>
                <div>
                    <HomeTitle title="Add New Task" para="Task Creator create's new tasks by providing essential details such as the task title, description, quantity, payment amount, completion date, submission information, and an image URL. This streamlined form ensures all necessary information is captured to effectively manage and track tasks.">
                    </HomeTitle>
                </div>
                <div className="w-[80%] mx-auto my-10">
                    <form className="w-[100%]" onSubmit={handleForm}>
                        {/* task title & task details */}
                        <div className="flex gap-6 justify-between">
                            <div className="flex flex-col gap-3 w-full">
                                <label>Task Title</label>
                                <input type="text" placeholder="Type Task Title" name="task_title" className="input input-bordered w-full" />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label>Task Details</label>
                                <input type="text" placeholder="Type details here" name="task_details" className="input input-bordered w-full" />
                            </div>
                        </div>

                        {/* Task quantity & payable amount */}
                        <div className="flex  gap-6 justify-between mt-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label>Task Quantity</label>
                                <input type="number" placeholder="Select quantity here" name="quantity" className="input input-bordered w-full" />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label>Payable Amount Per Task</label>
                                <input type="number" placeholder="Select points" name="payable_amount" className="input input-bordered w-full" />
                            </div>
                        </div>

                        {/* completion date & submission info */}
                        <div className="flex  gap-6 justify-between mt-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label>Completion Date</label>
                                <input type="date" placeholder="Select Date" name="completion_date" className="input input-bordered w-full" />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label>Submission Information</label>
                                <input type="text" placeholder="Type here" name="submission_info" className="input input-bordered w-full" />
                            </div>
                        </div>

                        {/* task image url */}
                        <div className="flex  gap-6 justify-between mt-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label>Task Image URL</label>
                                <input type="file" name="task_image" className="file-input file-input-bordered file-input-primary w-full" />
                                {
                                    uploadError && <p className="text-red-600">{uploadError}</p>
                                }
                            </div>
                        </div>
                        <div className="mt-5">
                            <button className="btn btn-primary" type="submit">Add Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default AddTask;