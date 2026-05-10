import "../index.css"


export default function Banner() {

    return (
        <>
            <div className="flex flex-wrap items-center gap-3 p-1">
            <div className="min-w-0 flex-1 border-box">
                    <h2 
                    style={{fontFamily: "Lobster", 
                            letterSpacing: "1px"
                           }}
                    className="font-display text-2xl font-semibold text-left text-white sm:text-3xl"
                    >
                        kameron gano
                    </h2>
                </div>
                <div className="shrink-0 text-center p-1">
                    <h2 className="transform transition duration-600 scale-100 text-lg font-medium font-display text-white hover:transition duration-600 hover:scale-110 sm:text-xl sm:hover:scale-125">
                        <a className="banner-elem" href="#projects"> 
                            research
                        </a>
                    </h2>
                </div>
                {/* <div className="w-1/6 text-center p-1">
                    <h2 className="transform transition duration-600 scale-100 text-xl font-medium font-display text-white hover:transition duration-600 hover:scale-125">
                        <a className="banner-elem" href="">
                            about
                        </a>
                    </h2>
                </div> */}
                
            </div>
        </>
    )
}
