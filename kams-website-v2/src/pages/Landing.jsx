import Banner from "../atoms/Banner";
import Hello from "../components/Hello";
import { Typewriter } from 'react-simple-typewriter';
import landing from "../images/landing.svg"
import Link from "../atoms/Link";
import github from "../images/github-mark-white.svg";
import gscholar from "../images/g-logo.png";


export default function Landing() {

    return(
        <section 
                 style=
                 {{backgroundImage: `url(${landing})`,
                   backgroundRepeat: "no-repeat",
                   backgroundSize: "cover"}} 
                  className="relative flex min-h-screen w-full flex-col bg-[#001220] px-5 py-6 sm:px-8"
          >
            <div>
              <Banner/>
            </div>
            <div className="grid flex-1 place-items-center py-12 sm:py-16">
              <div className="grid w-full max-w-5xl place-items-center">
                  <Hello>
                    <p className="text-center text-lg leading-snug text-white sm:text-xl md:text-3xl">
                      {"i like "} 
                      <span className="magic">
                        <span className="magic-text">
                          <span className="font-normal">
                          <Typewriter
                            words={[
                                    'designing hardware & software.', 
                                    'studying the brain.',
                                    'building cool things.' 
                                  ]}
                            typeSpeed={50}
                            deleteSpeed={50}
                            delaySpeed={1000}
                          />
                          </span>
                        </span>
                      </span>
                    </p>
                  </Hello>
                  <div className="w-full py-4">
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <a href = "https://github.com/kameron-gano" className="w-full max-w-[15rem] sm:w-auto">
                        <Link text="my github" img={github} />
                      </a>
                      <a href = "https://scholar.google.com/citations?user=deHISzIAAAAJ&hl=en" className="w-full max-w-[15rem] sm:w-auto">
                        <Link text="google scholar" img={gscholar} />
                      </a> 
                    </div>
                  </div>
                </div>
              </div>
          </section>
    );
}
