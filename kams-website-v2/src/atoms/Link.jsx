import "../index.css"
export default function Link({
    text="default",
    img=null,
}) {

    return (
        <span
            className="landing-link grid w-full place-items-center text-lg font-medium text-white sm:w-auto sm:text-xl" 
        >
            {
                !img ? 
                 text  :
                
                <div className="flex w-full items-center justify-center gap-3 p-1 sm:w-auto">
                    <div className="shrink-0"> 
                        <img className="h-9 w-9 sm:h-10 sm:w-10" src={img} alt=""></img>
                    </div>
                    <div className="grid min-w-0 place-items-center text-center">{text}</div>
               </div>
                
            }
        </span>
    );
}
