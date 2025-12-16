import React from "react"

export const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(to bottom right, #0f172a 0%, #172554 100%)",
      }}
    />
    <div
      className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-10"
      style={{
        background: "radial-gradient(circle, rgba(234, 179, 8, 1) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  </div>
)
