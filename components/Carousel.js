import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import CursoCard from './Curso/cursoCard'

let timeOutF;
const gap = 20
export default function Carousel({ array, xl = 5, lg = 3, md = 2, sm = 1, options=false }) {
    const [perPage, setperPage] = useState(xl)
    const [showingUntil, setshowingUntil] = useState(perPage)
    const [animate, setanimate] = useState(false)
    const [direction, setdirection] = useState(true)
    const [allowActions, setallowActions] = useState(true)

    const nextSlide = () => {
        if (allowActions) {
            setallowActions(false)
            setdirection(true)
            setanimate(true)
            timeOutF = setTimeout(() => {
                setshowingUntil(showingUntil <= (array?.length - 1) ? (showingUntil + 1) : showingUntil)
                setanimate(false)
                setallowActions(true)
            }, 700);
        }
    }

    const previousSlide = () => {
        if (allowActions) {
            setallowActions(false)
            setdirection(false)
            setanimate(true)
            timeOutF = setTimeout(() => {
                setshowingUntil(perPage < showingUntil ? (showingUntil - 1) : showingUntil)
                setanimate(false)
                setallowActions(true)
            }, 700);
        }
    }

    const container = useRef(null);
    const [elementWidth, setelementWidth] = useState(0)

    const handleResize = () => {
        let windowScreen = window?.innerWidth
        let newPerpage = xl
        if (windowScreen <= 500) {
            newPerpage = sm
        } else {
            if (windowScreen <= 800) {
                newPerpage = md
            } else {
                if (windowScreen <= 1024) {
                    newPerpage = lg
                } else {
                    newPerpage = xl
                }
            }
        }
        setelementWidth(container.current ? ((container.current.offsetWidth - (gap * (newPerpage - 1))) / newPerpage) : 0)
        setperPage(newPerpage)
        setshowingUntil(newPerpage)
    }

    useEffect(() => {
        handleResize()

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [container.current]);

    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if(isLeftSwipe){
            nextSlide()
        }
        if(isRightSwipe){
            previousSlide()
        }
        // add your conditional logic here
    }
    return (
        <div ref={container} className="relative overflow-x-hidden" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <Left show={perPage < showingUntil} handleClick={previousSlide} />
            <div className={`flex gap-5 justify-start w-max pt-2 ${animate ? 'transform transition-all duration-700' : ''}`} style={{ transform: `translateX(${animate ? (direction ? `-${(elementWidth + gap) * 2}` : '0') : `-${(elementWidth + gap)}`}px)` }}>
                {
                    array?.filter((s, i) => ((showingUntil - perPage) == 0 ? 0 : (showingUntil - perPage - 1)) <= i && (i) <= (showingUntil))
                        .map((Curso, i) =>
                            <div key={`carousel_card_${i}`} style={{ width: `${elementWidth}px`, marginLeft: `${(showingUntil - perPage) + i == 0 ? (elementWidth + gap) : '0'}px` }}>

                                <CursoCard Curso={Curso} options={options} />

                            </div>
                        )
                }
            </div>
            <Right show={showingUntil <= (array?.length - 1)} handleClick={nextSlide} />
        </div>
    )
}

const Left = ({ show, handleClick }) => {
    return (
        <Transition
            show={show}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <button onClick={handleClick} className={`absolute z-20 bg-darkblue w-10 h-10 opacity-70 hover:opacity-90 rounded-full flex justify-center items-center inset-y-0 my-auto left-3 md:left-9 transition-all ease-in-out duration-300 shadow-md`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        </Transition>
    )
}

const Right = ({ show, handleClick }) => {
    return (
        <Transition
            show={show}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <button onClick={handleClick} className={`absolute z-20 bg-darkblue w-10 h-10 opacity-70 hover:opacity-90 rounded-full flex justify-center items-center inset-y-0 my-auto right-3 md:right-9 transition-all ease-in-out duration-300 shadow-md`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </Transition>
    )
}