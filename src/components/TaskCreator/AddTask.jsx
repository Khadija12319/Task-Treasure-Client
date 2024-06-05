import HomeTitle from "../Shared/HomeTitle/HomeTitle";

const AddTask =() =>{
    return(
        <>
            <div>
                <div>
                    <HomeTitle title="Add New Task" para="Task Creator create's new tasks by providing essential details such as the task title, description, quantity, payment amount, completion date, submission information, and an image URL. This streamlined form ensures all necessary information is captured to effectively manage and track tasks.">
                    </HomeTitle>
                </div>
                <div className="w-[80%] mx-auto my-10">
                    <form className="w-[100%]">
                        {/* task title & task details */}
                        <div className="flex  gap-6 justify-between">
                            <div className="flex flex-col gap-3 w-full">
                                <label>Task Title</label>
                                <input type="text" placeholder="Type Task Title" className="input input-bordered w-full" />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label>Task Details</label>
                                <input type="text" placeholder="Type details here" className="input input-bordered w-full" />
                            </div>
                        </div>

                        {/* Task quantity & payable amount */}
                        <div className="flex  gap-6 justify-between mt-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label>Task Quantity</label>
                                <input type="number" placeholder="Select quantity here" className="input input-bordered w-full" />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label>Payable Amount Per Task</label>
                                <input type="number" placeholder="Select points" className="input input-bordered w-full" />
                            </div>
                        </div>

                        {/* completion date & submission info */}
                        <div className="flex  gap-6 justify-between mt-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label>Completion Date</label>
                                <input type="date" placeholder="Select Date" className="input input-bordered w-full" />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label>Submission Information</label>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                            </div>
                        </div>

                        {/* task image url */}
                        <div className="flex  gap-6 justify-between mt-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label>Task Image URL</label>
                                <input type="file" className="file-input file-input-bordered file-input-primary w-full" />
                            </div>
                        </div>
                        <div className="mt-5">
                            <button className="btn btn-primary">Add Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default AddTask;