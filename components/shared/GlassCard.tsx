import React from "react"

export const GlassCard = ({
  children,
  className = "",
  hover = false,
  glow = false,
  style,
  ...props
}: { children: React.ReactNode; className?: string; hover?: boolean; glow?: boolean; style?: React.CSSProperties } & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`
      relative overflow-hidden
      rounded-[20px]
      transition-all duration-500 ease-out
      ${hover ? "hover:-translate-y-1 hover:scale-[1.005] cursor-pointer" : ""}
      ${glow ? "animate-glow" : ""}
      ${className}
    `}
    style={{
      background:
        "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: hover
        ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(234, 179, 8, 0.3) inset"
        : "0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset",
      ...style,
    }}
    {...props}
  >
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
)
