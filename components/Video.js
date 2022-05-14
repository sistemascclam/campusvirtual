import React, { useEffect, useRef, useState } from 'react'

export default function Video({ src,handleLessThanSixty,handleOnSixty,handleOnEnd }) {
    const [progress, setProgress] = useState(0);
    const videoRef = useRef()

    const handleProgress = (e) => {
        if (isNaN(videoRef?.current?.duration)) { return }
        let progress_tmp = (videoRef?.current?.currentTime / videoRef?.current?.duration) * 100
        setProgress(progress_tmp)
        if(progress_tmp>70){
            handleOnSixty()
        }else{
            handleLessThanSixty()
        }
    }

    useEffect(() => {
        setProgress(0)
        handleLessThanSixty()
        videoRef.current?.load()
    }, [src])


    return (
        <video className='w-full rounded-2xl shadow-xl' controls
            controlsList="nodownload"
            onTimeUpdate={handleProgress}
            onEnded={handleOnEnd}
            ref={videoRef}
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}
