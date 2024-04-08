function Vediocard({vediotitle,vediourl}){

    return(
    <>
       <div  className="shadow-md p-3 rounded-3xl  antialiased w-fit ">

                <span className="block text-3xl font-serif p-3">{vediotitle}</span>
             <video controls controlsList="nodownload" className="h-60 rounded-md">
            <source src={vediourl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        </div> 
    </>)
}
export default Vediocard;