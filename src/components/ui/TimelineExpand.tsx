"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Reveal from "@/components/info/Reveal"

interface TimelineDay {
  day: string
  date: string
  color: string
  events: string[]
}

interface TimelineExpandProps {
  days: TimelineDay[]
  initialSelectedIndex?: number
  thumbnailHeight?: number
  maxThumbnails?: number
}

export default function TimelineExpand({
  days,
  initialSelectedIndex = 0,
  thumbnailHeight = 200,
  maxThumbnails = 3,
}: TimelineExpandProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.body.classList.add("overflow-hidden")
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.classList.remove("overflow-hidden")
    }
  }, [isModalOpen])

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <div className="flex max-[719px]:flex-col min-[720px]:flex-row w-full max-[719px]:gap-6 min-[720px]:gap-2 rounded-md pb-10 pt-5 justify-center max-[719px]:items-center">
        {days.slice(0, maxThumbnails).map((day, i) => (
          <div
            key={`day-container-${i}`}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer ${
              selectedIndex === i 
                ? "max-[719px]:w-[90vw] max-[719px]:h-[28rem] min-[720px]:w-[50rem] min-[720px]:h-[32rem]" 
                : "max-[719px]:w-[85vw] max-[719px]:h-[6rem] min-[720px]:w-16 min-[720px]:h-[32rem]"
            }`}
            onMouseEnter={() => setSelectedIndex(i)}
            onMouseLeave={() => setSelectedIndex(i)}
            onClick={() => {
              setSelectedIndex(i)
              setIsModalOpen(true)
            }}
          >
            <motion.div
              layoutId={`day-${i}`}
              className="absolute inset-0 size-full text-[#141414] flex flex-col px-3 py-3"
              style={{ backgroundColor: selectedIndex === i ? '#fcf2e8' : '#fcf2e8' }}
            >
              {/* Centered day badge for collapsed cards */}
              {selectedIndex !== i && (
                <div 
                  className="flex-1 flex items-center justify-center rounded-2xl"
                  style={{ backgroundColor: day.color }}
                >
                  <span 
                    className="text-[#141414] font-bold text-xl uppercase max-[719px]:[writing-mode:horizontal-tb] min-[720px]:[writing-mode:vertical-lr] max-[719px]:[text-orientation:mixed] min-[720px]:[text-orientation:upright]"
                  >
                    {day.date}
                  </span>
                </div>
              )}
              
              {/* Header for expanded card */}
              {selectedIndex === i && (
                <div className="flex items-center justify-center gap-3 mb-5 flex-shrink-0 p-4 pb-1">
                  {/* <span 
                    className="inline-block text-[#141414] font-semibold px-4 py-2 rounded-full text-base"
                    style={{ backgroundColor: day.color }}
                  >
                    {day.date}
                  </span> */}
                  <h3 className="text-2xl md:text-3xl font-black text-center">{day.day}</h3>
                </div>
              )}
              
              {selectedIndex === i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 overflow-y-auto px-4 pt-0"
                >
                  <div className="max-w-4xl mx-auto space-y-4 pb-4">
                    {day.events.map((event, eventIndex) => {
                      // Extract time and description from event string
                      const [timePart, ...descParts] = event.split(' — ');
                      const description = descParts.join(' — ');
                      
                      // Extract only the starting time (before the dash or "AM"/"PM")
                      const startTime = timePart.split('–')[0].split('-')[0].trim();
                      
                      return (
                        <div key={eventIndex} className="flex items-center gap-4">
                          <div
                            className="text-[#141414] font-bold px-3 py-1 rounded-lg text-sm text-center flex-shrink-0"
                            style={{ backgroundColor: day.color }}
                          >
                            {startTime}
                          </div>
                          <div className="text-lg font-bold text-left flex-1">
                            {description}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {/* {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-content-center bg-black/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="cursor-auto overflow-hidden rounded-2xl bg-[#fcf2e8] text-[#141414] max-w-2xl w-full mx-4"
            >
              <motion.div
                layoutId={`day-${selectedIndex}`}
                className="relative p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span 
                    className="inline-block text-[#141414] font-semibold px-4 py-2 rounded-full text-base"
                    style={{ backgroundColor: days[selectedIndex].color }}
                  >
                    {days[selectedIndex].day}
                  </span>
                  <h3 className="text-2xl md:text-2xl font-black uppercase">{days[selectedIndex].date}</h3>
                </div>
                
                <div className="space-y-3">
                  <ul className="space-y-3 text-base font-medium">
                    {days[selectedIndex].events.map((event, eventIndex) => (
                      <li key={eventIndex} className="flex items-start gap-2">
                        <span className="text-xs text-gray-600 mt-1">•</span>
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#141414] text-[#fcf2e8] flex items-center justify-center hover:bg-[#333] transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            </div>
          </motion.div>
        )} */}
      </AnimatePresence>
    </div>
  )
}
