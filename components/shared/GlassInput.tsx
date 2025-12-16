import React from "react"

export const GlassInput = ({
  icon: Icon,
  ...props
}: { icon?: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative group">
    {Icon && (
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-all duration-400 text-slate-400 group-focus-within:text-yellow-400">
        <Icon size={20} />
      </div>
    )}
    <input
      {...props}
      className={`
        w-full
        rounded-xl
        ${Icon ? "pl-14" : "pl-5"} pr-5 py-4
        text-white placeholder-slate-500
        transition-all duration-400 ease-out
        focus:outline-none
        ${props.className || ""}
      `}
      style={{
        background: "rgba(15, 23, 42, 0.6)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
        ...props.style
      }}
      onFocus={(e) => {
        e.target.style.border = "1px solid rgba(234, 179, 8, 0.6)"
        e.target.style.boxShadow =
          "0 0 0 4px rgba(234, 179, 8, 0.1), inset 0 2px 4px rgba(0,0,0,0.2)"
        e.target.style.background = "rgba(15, 23, 42, 0.8)"
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        e.target.style.border = "1px solid rgba(255,255,255,0.1)"
        e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.2)"
        e.target.style.background = "rgba(15, 23, 42, 0.6)"
        props.onBlur?.(e)
      }}
    />
  </div>
)
