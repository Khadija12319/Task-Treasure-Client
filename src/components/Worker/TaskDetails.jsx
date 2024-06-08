import { useLoaderData } from "react-router-dom";

const TaskDetails=()=>{
    const tasks=useLoaderData();
    console.log(tasks);
    return(
        <>
        <div>
            
        </div>
        </>
    );
};
export default TaskDetails;