import React from "react"

export const GradientButton = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
  size = "default",
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "danger" | "success"
  disabled?: boolean
  type?: "button" | "submit"
  size?: "sm" | "default" | "lg"
}) => {
  const variants = {
    primary: {
      bg: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
      hover: "linear-gradient(135deg, #facc15 0%, #eab308 100%)",
      shadow: "0 4px 20px rgba(234, 179, 8, 0.3), 0 0 0 1px rgba(255,255,255,0.2) inset",
      hoverShadow: "0 8px 30px rgba(234, 179, 8, 0.4), 0 0 0 1px rgba(255,255,255,0.3) inset",
    },
    secondary: {
      bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)",
      hover: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)",
      shadow: "0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(59, 130, 246, 0.3) inset",
      hoverShadow: "0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(59, 130, 246, 0.4) inset",
    },
    danger: {
      bg: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
      hover: "linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)",
      shadow: "0 8px 32px rgba(220, 38, 38, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
      hoverShadow: "0 12px 40px rgba(220, 38, 38, 0.5), 0 0 0 1px rgba(255,255,255,0.15) inset",
    },
    success: {
      bg: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
      hover: "linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)",
      shadow: "0 8px 32px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
      hoverShadow: "0 12px 40px rgba(16, 185, 129, 0.5), 0 0 0 1px rgba(255,255,255,0.15) inset",
    },
  }

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    default: "px-6 py-3.5 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  }

  const v = variants[variant]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        text-white font-bold tracking-wide
        ${sizes[size]}
        transition-all duration-400 ease-out
        hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        group
        ${className}
      `}
      style={{
        background: v.bg,
        boxShadow: v.shadow,
        textShadow: variant === 'primary' ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = v.hover
          e.currentTarget.style.boxShadow = v.hoverShadow
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = v.bg
        e.currentTarget.style.boxShadow = v.shadow
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  )
}
