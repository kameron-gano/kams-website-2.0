import "../index.css"


export default function Hello({ children }) {

    return (
        <div className="grid h-full w-full place-items-center">
            <div className="flex w-full max-w-5xl flex-col items-center">
            <div className="w-full">
                <h1 className="px-0 py-2 text-center font-display text-[clamp(1.75rem,8vw,3.5rem)] font-semibold leading-tight text-white">
                    hey i am kameron!
                </h1>
                <h1 className="px-0 py-2 text-center font-display text-[clamp(1.5rem,7vw,3.25rem)] font-semibold leading-tight text-white" >
                    {"an "}
                    <span className="magic">
                        <span 
                        style={{letterSpacing: "1px"}}
                        className="magic-text">
                            electrical engineering
                        </span>
                    </span>
                    {" phd student."}
                    
                </h1>
            </div>
                <div className="w-full py-4">
                        { children }
                </div>
            </div>
        </div>
    )
}
