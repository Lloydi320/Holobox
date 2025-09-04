"use client"

import { useState } from "react"

export default function HoloboxInterface() {
  const [step, setStep] = useState(1)

  const handleStart = () => setStep(2)
  const handleView3D = () => setStep(3)
  const handleBackToStart = () => setStep(1)
  const handleBackToDescription = () => setStep(2)

  return (
    <div className="w-[1080px] h-[1920px] relative overflow-hidden bg-black">
      {/* Step 1: Start Button Only */}
      {step === 1 && (
        <>
          {/* Green top section */}
          <div className="absolute top-0 left-0 w-full h-64 bg-green-500"></div>

          {/* Green bottom section */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-green-500"></div>

          {/* Start button positioned on top of the animation */}
          <button
            onClick={handleStart}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-transparent hover:bg-cyan-900/20 text-cyan-300 border-2 border-cyan-300 px-12 py-4 rounded-lg text-2xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 active:bg-cyan-800/30 z-10"
          >
            Start
          </button>
        </>
      )}

      {/* Step 2: Lorem Ipsum Description + View 3D Model Button */}
      {step === 2 && (
        <>
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-96">
            <div className="w-full h-80 p-6 text-lg border-2 border-cyan-400 rounded-lg bg-transparent text-cyan-300 overflow-y-auto scrollbar-hide">
              <h3 className="text-2xl font-bold mb-4 text-center text-cyan-200">Lorem Ipsum</h3>
              <p className="mb-4 text-sm leading-relaxed">
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
              </p>
              <p className="mb-4 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id nunc finibus, porta dui vel, feugiat
                nisl. Integer interdum tortor id mauris mattis dapibus. Etiam finibus eros sem, a feugiat ipsum ultrices
                ac. Nulla ultrices urna sed fermentum tempor.
              </p>
              <p className="text-sm leading-relaxed">
                Quisque quis lobortis tortor. Vivamus lorem massa, elementum sit amet elit vitae, feugiat feugiat enim.
                Ut porta ligula urna. Donec gravida cursus mi, vitae condimentum ligula interdum nec.
              </p>
            </div>
          </div>
          <button
            onClick={handleBackToStart}
            className="absolute bottom-20 left-8 bg-transparent hover:bg-cyan-900/20 text-cyan-300 border-2 border-cyan-300 px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 active:bg-cyan-800/30"
          >
            Back
          </button>
          <button
            onClick={handleView3D}
            className="absolute bottom-20 right-8 bg-transparent hover:bg-cyan-900/20 text-cyan-300 border-2 border-cyan-300 px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 active:bg-cyan-800/30"
          >
            View 3D Model
          </button>
        </>
      )}

      {/* Step 3: 3D Model Viewer + Back Button */}
      {step === 3 && (
        <>
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-96 h-[600px] border-2 border-cyan-400 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
            <div className="relative w-32 h-32" style={{ perspective: "400px" }}>
              <div
                className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 border-2 border-green-300"
                style={{
                  transformStyle: "preserve-3d",
                  animation: "rotate3d 4s linear infinite",
                  transform: "rotateX(45deg) rotateY(45deg)",
                }}
              />
            </div>
          </div>
          <button
            onClick={handleBackToStart}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-transparent hover:bg-cyan-900/20 text-cyan-300 border-2 border-cyan-300 px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 active:bg-cyan-800/30"
          >
            Back
          </button>
        </>
      )}

      <style jsx>{`
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        
        /* Added CSS to hide scrollbar while maintaining scroll functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </div>
  )
}
