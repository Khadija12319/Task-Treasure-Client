
const HomeTitle = ({title,para}) =>{
    return(
        <div className="container mx-auto space-y-5 py-10">
            <h1 className="text-center text-4xl font-semibold">-----{title}-----</h1>
            <p className="text-lg text-center w-[70%] mx-auto">{para}</p>
        </div>
    )
}
export default HomeTitle;