import {useEffect, useRef, useState} from "react";
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/all";
import {gsap} from "gsap";
gsap.registerPlugin(ScrollTrigger)
const Hero = () => {
    const totalVideos = 4;

    const [currentIndex, setCurrentIndex] = useState(1);
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1

    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const nextVideoRef = useRef(null);

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    }
    const handleVideoLoad = () => {
        setLoadedVideos((prevState) => prevState + 1)
    }
    useEffect(() => {

        if (loadedVideos === totalVideos-1) {
            setIsLoading(false)
        }
    },[loadedVideos])
    useGSAP(()=>{
        if(hasClicked){
            gsap.set('#next-video',{visibility:'visible'});
            gsap.to('#next-video',{
                transformOrigin:'center center',
                scale:1,
                width:'100%',
                height:'100%',
                duration:1,
                ease:'power1.inOut',
                onStart:()=> nextVideoRef.current.play(),
            });
            gsap.from('#current-video',{
                transformOrigin:'center center',
                scale:0,
                duration:1.5,
                ease:'power1.inOut',
            });

        }
    },{dependencies:[currentIndex],revertOnUpdate:true})
    useGSAP(()=>{
        gsap.set('#video-frame',{
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%'
        })

        gsap.from('#video-frame',{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease:'power1.inOut',
            scrollTrigger:{
                trigger:'#video-frame',
                start:'center center',
                end:'bottom center',
                scrub:true,
            }

        })

    })
    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">

                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lq bg-blue-75">
                <div>
                    <div
                        className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVdClick}
                             className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>
                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        autoPlay
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                         autoPlay
                        loop
                        muted
                        id="next-video"
                        className=" absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">G<b>A</b>MING</h1>
                <div className="absolute left-0 top-4 z-40 size-full">
                    <div className="mt-12 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">Redefi<b>n</b>e</h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the meta game layer <br/>
                            Unleash the play economy
                        </p>
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>}
                                containerClass="!bg-yellow-300 flex-center gap-1" onClick={handleMiniVdClick}/>

                    </div>


                </div>
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black">G<b>A</b>MING</h1>
        </div>
    )
}
export default Hero
