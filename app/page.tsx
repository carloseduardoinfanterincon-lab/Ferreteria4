"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Package,
  DollarSign,
  Upload,
  Users,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Search,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
  X,
  Sparkles,
  TrendingUp,
  ClipboardList,
  MessageSquarePlus,
  ArrowLeft,
} from "lucide-react"

// Asegúrate de que esta ruta sea correcta en tu proyecto
import {
  getArticulos,
  createArticulo,
  updateArticulo,
  deleteArticulo,
} from "./actions/productos"
import {
  getReportes,
  createReporte,
  deleteReporte,
  updateReporteStatus,
  type Reporte,
} from "./actions/reportes"
import * as XLSX from "xlsx"

// --- COMPONENTS VISUALES ---

const AnimatedBackground = () => (
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

const GlassCard = ({
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

const GradientButton = ({
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

const GlassInput = ({
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

const LoginScreen = ({ onLogin }: { onLogin: (role: "admin" | "employee") => void }) => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "ferre0313") {
      onLogin("admin")
    } else {
      setError("Contraseña incorrecta")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 font-sans"
      style={{
        background: "#0f172a",
      }}
    >
      <AnimatedBackground />

      <div
        className={`w-full max-w-md relative z-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <GlassCard className="overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #1e40af 0%, #172554 100%)",
                    border: "2px solid #3b82f6",
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <Package size={48} className="text-yellow-400 relative z-10" />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center animate-bounce"
                  style={{
                    background: "#eab308",
                    boxShadow: "0 4px 15px rgba(234, 179, 8, 0.4)",
                  }}
                >
                  <Sparkles size={20} className="text-black" />
                </div>
              </div>
              <h1
                className="text-4xl font-extrabold mb-3 tracking-tight"
                style={{
                  color: "white",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                }}
              >
                Ferretería la <span className="text-yellow-400">4</span>
              </h1>
              <p className="text-slate-400 font-medium text-lg">Inventario</p>
            </div>

            <div className="space-y-5">
              <p className="text-sm text-slate-500 text-center mb-6 uppercase tracking-wider font-bold">
                Seleccione su acceso
              </p>

              <button
                onClick={() => onLogin("employee")}
                className="w-full group relative flex items-center p-5 rounded-xl transition-all duration-400"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)"
                  e.currentTarget.style.borderColor = "#3b82f6"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <div
                  className="p-3.5 rounded-lg transition-all duration-400 group-hover:scale-110"
                  style={{
                    background: "rgba(59, 130, 246, 0.2)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <Users size={24} className="text-blue-400" />
                </div>
                <div className="ml-4 text-left flex-1">
                  <h3 className="text-white font-bold text-lg">Asesor</h3>
                  <p className="text-sm text-slate-400">Acceso al panel de asesores</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 text-yellow-400 translate-x-[-8px] group-hover:translate-x-0">
                  →
                </div>
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="text-xs text-slate-500 uppercase font-bold">o</span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-5">
                <div
                  className="flex items-center gap-4 mb-5 p-4 rounded-xl"
                  style={{
                    background: "rgba(234, 179, 8, 0.05)",
                    border: "1px solid rgba(234, 179, 8, 0.2)",
                  }}
                >
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: "rgba(234, 179, 8, 0.2)",
                    }}
                  >
                    <Shield size={22} className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Administrador</h3>
                    <p className="text-sm text-slate-400">Gestión total del inventario</p>
                  </div>
                </div>

                <GlassInput
                  type="password"
                  placeholder="Contraseña de Admin"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                />

                {error && (
                  <div className="flex items-center gap-3 text-red-400 text-sm px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-fade-up">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                <GradientButton type="submit" className="w-full">
                  Ingresar al Sistema
                </GradientButton>
              </form>
            </div>

            <div
              className="mt-8 pt-6 flex justify-center gap-3 flex-wrap"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {["Control de Stock", "Caja", "Facturación"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-400 border border-slate-700 bg-slate-800/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

// --- TYPE DEFINITIONS ---
interface Product {
  id: string
  name: string
  cost: number
  price: number
  category?: string
  stock: number
  supplier?: string
  lastUpdate: string
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  gradient,
  delay = 0,
}: {
  title: string
  value: string | number
  icon: React.ElementType
  gradient: { bg: string; border: string; iconBg: string; text: string }
  delay?: number
}) => (
  <GlassCard hover className="p-6 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
        <p className="text-4xl font-bold text-white tracking-tight">{value}</p>
      </div>
      <div
        className="p-4 rounded-xl transition-transform duration-400 hover:scale-110"
        style={{
          background: gradient.iconBg,
          border: `1px solid ${gradient.border}`,
        }}
      >
        <Icon size={28} style={{ color: gradient.text }} />
      </div>
    </div>
  </GlassCard>
)

// --- PRODUCT MODAL ---
interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { name: string; cost: number; price: number }) => void
  initialData: Product | null
  isLoading: boolean
}

const ProductModal = ({ isOpen, onClose, onSave, initialData, isLoading }: ProductModalProps) => {
  const [name, setName] = useState("")
  const [cost, setCost] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [utility, setUtility] = useState<string>("")

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name)
        setCost(initialData.cost.toString())
        setPrice(initialData.price.toString())
        
        // CONDICIONAL AÑADIDO: Si costo o precio es 0, Margen = 0
        if (initialData.price > 0 && initialData.cost > 0) {
          const marginVal = (1 - (initialData.cost / initialData.price)) * 100
          setUtility(marginVal.toFixed(2))
        } else {
          setUtility("0")
        }
      } else {
        setName("")
        setCost("")
        setPrice("")
        setUtility("")
      }
    }
  }, [isOpen, initialData])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Lógica de cálculo: Si cambio el Costo
  const handleCostChange = (val: string) => {
    setCost(val)
    const numCost = parseFloat(val)
    const numUtility = parseFloat(utility)
    
    // Si: Margen = 1 - (Costo/Precio)
    // Entonces: Costo/Precio = 1 - Margen
    // Entonces: Precio = Costo / (1 - Margen)
    if (!isNaN(numCost) && !isNaN(numUtility) && numUtility < 100) {
      const marginDecimal = numUtility / 100
      const newPrice = numCost / (1 - marginDecimal)
      setPrice(newPrice.toFixed(2))
    }
  }

  // Lógica de cálculo: Si cambio la Utilidad (%)
  const handleUtilityChange = (val: string) => {
    setUtility(val)
    const numUtility = parseFloat(val)
    const numCost = parseFloat(cost)

    // Precio = Costo / (1 - Margen)
    if (!isNaN(numUtility) && !isNaN(numCost) && numUtility < 100) {
      const marginDecimal = numUtility / 100
      // Evitar división por cero si margen es 100%
      if (marginDecimal !== 1) {
        const newPrice = numCost / (1 - marginDecimal)
        setPrice(newPrice.toFixed(2))
      }
    }
  }

  // Lógica de cálculo: Si cambio el Precio Manualmente
  const handlePriceChange = (val: string) => {
    setPrice(val)
    const numPrice = parseFloat(val)
    const numCost = parseFloat(cost)

    // CONDICIONAL AÑADIDO: Si costo es 0 o precio es 0, Margen = 0
    if (!isNaN(numPrice) && !isNaN(numCost) && numPrice > 0 && numCost > 0) {
      const newUtility = (1 - (numCost / numPrice)) * 100
      setUtility(newUtility.toFixed(2))
    } else {
      setUtility("0")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name,
      cost: cost === "" ? 0 : Number(cost),
      price: price === "" ? 0 : Number(price),
    })
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(5px)",
      }}
    >
      <GlassCard className="w-full max-w-lg p-8 animate-scale-in">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            {initialData ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 transition-colors hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2">
              Nombre del Producto <span className="text-yellow-500">*</span>
            </label>
            <GlassInput
              autoFocus
              required
              type="text"
              placeholder="Ej: Taladro Percutor 1/2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 items-end">
            {/* Campo Costo */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Costo ($)</label>
              <GlassInput
                type="number"
                step="0.01"
                placeholder="0.00"
                value={cost}
                onChange={(e) => handleCostChange(e.target.value)}
                style={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
              />
            </div>

            {/* Campo Utilidad */}
            <div className="relative">
              <label className="block text-xs font-bold text-yellow-500 mb-2 uppercase tracking-wide text-center">
                Margen (%)
              </label>
               <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  placeholder="%"
                  value={utility}
                  onChange={(e) => handleUtilityChange(e.target.value)}
                  className="w-full rounded-xl py-4 px-3 text-center text-yellow-400 font-bold bg-slate-800/80 border border-yellow-500/30 focus:outline-none focus:border-yellow-500 transition-all"
                />
               </div>
            </div>

            {/* Campo Precio Venta */}
            <div>
              <label className="block text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wide text-right">Venta ($)</label>
              <GlassInput
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="text-right font-bold text-emerald-300"
                style={{ borderColor: "rgba(16, 185, 129, 0.5)" }}
              />
            </div>
          </div>

          {/* Resumen Visual */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 flex justify-between text-sm">
             <span className="text-slate-400">Ganancia por unidad:</span>
             <span className="font-mono font-bold text-emerald-400">
               ${(!isNaN(parseFloat(price)) && !isNaN(parseFloat(cost))) ? (parseFloat(price) - parseFloat(cost)).toFixed(2) : "0.00"}
             </span>
          </div>

          <div className="flex gap-4 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3.5 px-4 rounded-xl text-slate-300 transition-all duration-400 disabled:opacity-50 hover:bg-white/5 border border-white/10"
            >
              Cancelar
            </button>
            <GradientButton type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Guardando...
                </>
              ) : initialData ? (
                "Guardar Cambios"
              ) : (
                "Crear Producto"
              )}
            </GradientButton>
          </div>
        </form>
      </GlassCard>
    </div>
  )
}

// --- REPORTS MODAL (ADMIN) ---
const ReportsModal = ({
  isOpen,
  onClose,
  reports,
  onDelete,
  onResolve,
  isLoading,
}: {
  isOpen: boolean
  onClose: () => void
  reports: Reporte[]
  onDelete: (id: string) => void
  onResolve: (id: string) => void
  isLoading: boolean
}) => {
  const [tab, setTab] = useState<"pending" | "history">("pending")

  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  const pendingReports = reports
    .filter((r) => r.status !== "resolved")
    .sort((a, b) => {
      const prA = a.priority === "agotado" ? 0 : 1
      const prB = b.priority === "agotado" ? 0 : 1
      if (prA !== prB) return prA - prB
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

  const resolvedReports = reports
    .filter((r) => r.status === "resolved")
    .sort((a, b) => {
      const prA = a.priority === "agotado" ? 0 : 1
      const prB = b.priority === "agotado" ? 0 : 1
      if (prA !== prB) return prA - prB
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(5px)",
      }}
    >
      <GlassCard
        className="w-full max-w-5xl p-8 animate-scale-in h-[80vh] flex flex-col min-h-0 overflow-hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
              <ClipboardList size={24} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Reportes de Agotados</h2>
              <p className="text-slate-400 text-sm">Pendientes e historial</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 transition-colors hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setTab("pending")}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
              tab === "pending"
                ? "bg-red-500/20 border-red-500/40 text-red-200"
                : "bg-slate-900/40 border-slate-700/50 text-slate-400 hover:text-white"
            }`}
          >
            Pendientes ({pendingReports.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("history")}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
              tab === "history"
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200"
                : "bg-slate-900/40 border-slate-700/50 text-slate-400 hover:text-white"
            }`}
          >
            Historial ({resolvedReports.length})
          </button>
        </div>

        <div
          className="flex-1 min-h-0 max-h-full overflow-y-scroll pr-2 overscroll-contain touch-pan-y"
          style={{ WebkitOverflowScrolling: "touch", overflowAnchor: "none" }}
          onWheel={(e) => {
            e.stopPropagation()
          }}
          onTouchMove={(e) => {
            e.stopPropagation()
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 size={48} className="text-yellow-500 animate-spin mb-4" />
              <p className="text-slate-400">Cargando reportes...</p>
            </div>
          ) : tab === "pending" ? (
            pendingReports.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <ClipboardList size={64} className="opacity-20 mb-4" />
                <p className="text-lg font-medium">No hay reportes pendientes</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 flex items-start justify-between gap-4 group hover:border-slate-600 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-lg font-bold text-white">{report.productName}</h3>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                            report.priority === "agotado"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          }`}
                        >
                          {report.priority === "agotado" ? "Agotado" : "Casi Agotado"}
                        </span>
                      </div>
                      {report.note && (
                        <p className="text-slate-400 text-sm mb-2 bg-slate-900/50 p-2 rounded-lg inline-block">
                          Nota: {report.note}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>📅 {new Date(report.createdAt).toLocaleDateString()}</span>
                        <span>👤 {report.createdBy}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onResolve(report.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all"
                        title="Aceptar (pasar a historial)"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => onDelete(report.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : resolvedReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <CheckCircle size={64} className="opacity-20 mb-4" />
              <p className="text-lg font-medium">Aún no hay reportes aceptados</p>
              <p className="text-sm">Cuando aceptes un reporte, aparecerá aquí para seguimiento.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {resolvedReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-xl border border-slate-700/50 bg-slate-900/30 flex items-start justify-between gap-4 group hover:border-slate-600 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-lg font-bold text-white">{report.productName}</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                        Aceptado
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                          report.priority === "agotado"
                            ? "bg-red-500/15 text-red-300 border border-red-500/20"
                            : "bg-yellow-500/15 text-yellow-300 border border-yellow-500/20"
                        }`}
                      >
                        {report.priority === "agotado" ? "Agotado" : "Casi Agotado"}
                      </span>
                    </div>

                    {report.note && (
                      <p className="text-slate-400 text-sm mb-2 bg-slate-900/50 p-2 rounded-lg inline-block">
                        Nota: {report.note}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>📝 Reportado: {new Date(report.createdAt).toLocaleDateString()}</span>
                      {report.resolvedAt && <span>✅ Aceptado: {new Date(report.resolvedAt).toLocaleDateString()}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDelete(report.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Eliminar del historial"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  )
}

// --- ADVISOR MENU COMPONENT ---
const AdvisorMenu = ({
  onSelect,
  onLogout,
}: {
  onSelect: (view: "prices" | "reports") => void
  onLogout: () => void
}) => (
  <div className="min-h-screen flex items-center justify-center p-6 font-sans relative z-10">
    <div className="w-full max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-2">Panel de Asesor</h1>
        <p className="text-slate-400">Seleccione una operación</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect("prices")}
          className="group relative overflow-hidden rounded-3xl p-8 text-left transition-all duration-500 hover:-translate-y-2"
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Search size={32} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Consulta de Precios</h3>
            <p className="text-slate-400">Buscar productos, verificar precios y disponibilidad en inventario.</p>
          </div>
        </button>

        <button
          onClick={() => onSelect("reports")}
          className="group relative overflow-hidden rounded-3xl p-8 text-left transition-all duration-500 hover:-translate-y-2"
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <ClipboardList size={32} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Reportar Agotados</h3>
            <p className="text-slate-400">Notificar a administración sobre productos agotados o próximos a agotarse.</p>
          </div>
        </button>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  </div>
)

// --- ADVISOR REPORT FORM ---
const AdvisorReportForm = ({
  onBack,
  onSubmit,
  isLoading,
  products,
  existingReports,
}: {
  onBack: () => void
  onSubmit: (data: { productName: string; note: string; priority: "agotado" | "casi_agotado" }) => void
  isLoading: boolean
  products: Product[]
  existingReports: Reporte[]
}) => {
  const [productName, setProductName] = useState("")
  const [note, setNote] = useState("")
  const [priority, setPriority] = useState<"agotado" | "casi_agotado">("agotado")
  const [showSuccess, setShowSuccess] = useState(false)
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productName.trim()) return
    
    await onSubmit({ productName, note, priority })
    setProductName("")
    setNote("")
    setPriority("agotado")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setProductName(value)
    
    if (value.length > 0) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const selectSuggestion = (name: string) => {
    setProductName(name)
    setShowSuggestions(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans relative z-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al menú
          </button>

          <GlassCard className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                <MessageSquarePlus size={32} className="text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Reportar Agotado</h1>
                <p className="text-slate-400 text-sm">Ayúdanos a mantener el inventario al día</p>
              </div>
            </div>

            {showSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center gap-3 text-green-400 animate-fade-up">
                <CheckCircle size={20} />
                <span>¡Reporte enviado exitosamente!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-bold text-slate-400 mb-2">
                  Nombre del Producto <span className="text-red-400">*</span>
                </label>
                <GlassInput
                  autoFocus
                  required
                  placeholder="Ej: Cemento Gris Argos"
                  value={productName}
                  onChange={handleNameChange}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  autoComplete="off"
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-fade-up">
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => selectSuggestion(product.name)}
                        className="w-full text-left px-4 py-3 text-slate-300 hover:bg-blue-500/20 hover:text-white transition-colors border-b border-slate-800 last:border-0 flex justify-between items-center group"
                      >
                        <span className="font-medium group-hover:text-yellow-400 transition-colors">{product.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">
                  Prioridad <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPriority("agotado")}
                    className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                      priority === "agotado"
                        ? "bg-red-500/20 border-red-500 text-white"
                        : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${priority === "agotado" ? "bg-red-500" : "bg-slate-600"}`} />
                    <span className="font-bold">Agotado</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority("casi_agotado")}
                    className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                      priority === "casi_agotado"
                        ? "bg-yellow-500/20 border-yellow-500 text-white"
                        : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${priority === "casi_agotado" ? "bg-yellow-500" : "bg-slate-600"}`} />
                    <span className="font-bold">Casi Agotado</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">
                  Nota Adicional (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalles adicionales..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <GradientButton
                type="submit"
                className="w-full"
                variant="danger"
                disabled={isLoading || !productName.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Reporte"
                )}
              </GradientButton>
            </form>
          </GlassCard>
        </div>

        {/* Existing Reports Panel */}
        <div className="h-full">
          <div className="mb-6 h-[52px]" /> {/* Spacer to align with back button */}
          <GlassCard className="p-8 h-[calc(100%-76px)] flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                <ClipboardList size={24} className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Reportes Activos</h2>
                <p className="text-slate-400 text-sm">Verifica si ya fue reportado</p>
              </div>
            </div>

            <div
              className="flex-1 min-h-0 overflow-y-scroll pr-2 space-y-3 overscroll-contain touch-pan-y"
              style={{ WebkitOverflowScrolling: "touch" }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {existingReports.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-50">
                  <ClipboardList size={48} className="mb-3" />
                  <p>No hay reportes activos</p>
                </div>
              ) : (
                existingReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-sm">{report.productName}</h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          report.priority === "agotado"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        }`}
                      >
                        {report.priority === "agotado" ? "Agotado" : "Casi Agotado"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                      <span>{report.createdBy}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

// --- MAIN APPLICATION ---
export default function HardwareApp() {
  const [role, setRole] = useState<"admin" | "employee" | null>(null)
  const [advisorView, setAdvisorView] = useState<"menu" | "prices" | "reports">("menu")
  const [products, setProducts] = useState<Product[]>([])
  const [reports, setReports] = useState<Reporte[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [importStatus, setImportStatus] = useState<{
    type: "success" | "error" | "warning"
    msg: string
    details?: string[]
  } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [adminFilter, setAdminFilter] = useState<'all' | 'noCost' | 'noPrice'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isModalOpen) setIsModalOpen(false)
        if (isReportsModalOpen) setIsReportsModalOpen(false)
        if (isDeleteConfirmOpen) setIsDeleteConfirmOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, isReportsModalOpen, isDeleteConfirmOpen])

  useEffect(() => {
    if (role === "admin") {
      loadProducts()
      loadReports()
    } else if (role === "employee") {
      // Load products for both prices and reports view to enable autocomplete
      loadProducts()
    }
  }, [role, advisorView])

  const loadProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getArticulos()
      if (response.success && response.data) {
        const mappedProducts: Product[] = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          cost: Number(item.cost) || 0,
          price: Number(item.price) || 0,
          category: "",
          stock: 0,
          supplier: "",
          lastUpdate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "",
        }))
        setProducts(mappedProducts)
      } else {
        setError(response.error || "Error al cargar productos")
      }
    } catch (err) {
      setError("Error de conexión con Firebase")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const loadReports = async () => {
    try {
      const response = await getReportes()
      if (response.success && response.data) {
        setReports(response.data)
      }
    } catch (err) {
      console.error("Error loading reports:", err)
    }
  }

  const handleLogin = (selectedRole: "admin" | "employee") => {
    setRole(selectedRole)
    if (selectedRole === "employee") {
      setAdvisorView("menu")
    }
  }

  const handleLogout = () => {
    setRole(null)
    setSearchTerm("")
    setProducts([])
    setAdvisorView("menu")
  }

  const handleCreateReport = async (data: { productName: string; note: string; priority: "agotado" | "casi_agotado" }) => {
    setIsLoading(true)
    try {
      const response = await createReporte(data)
      if (!response.success) {
        setError(response.error || "Error al crear reporte")
      } else {
        // Refresh reports list for advisor view
        loadReports()
      }
    } catch (err) {
      setError("Error al enviar reporte")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteReport = async (id: string) => {
    try {
      const response = await deleteReporte(id)
      if (response.success) {
        setReports(reports.filter((r) => r.id !== id))
      }
    } catch (err) {
      console.error("Error deleting report:", err)
    }
  }

  const handleResolveReport = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await updateReporteStatus(id, "resolved")
      if (response.success) {
        await loadReports()
      }
    } catch (err) {
      console.error("Error resolving report:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProduct = async (data: { name: string; cost: number; price: number }) => {
    const safeCost = Number(data.cost);
    const safePrice = Number(data.price);

    if (data.name && !isNaN(safeCost) && !isNaN(safePrice) && safeCost >= 0 && safePrice >= 0) {
      setIsLoading(true)
      setError(null)
      try {
        if (editingProduct) {
          // Update existing product
          const response = await updateArticulo(editingProduct.id, {
            name: data.name,
            cost: safeCost,
            price: safePrice,
          })

          if (response.success) {
            setProducts((prev) =>
              prev.map((p) =>
                p.id === editingProduct.id ? { ...editingProduct, name: data.name, cost: safeCost, price: safePrice } : p,
              ),
            )
            setEditingProduct(null)
            setIsModalOpen(false)
          } else {
            setError(response.error || "Error al actualizar producto")
          }
        } else {
          // Create new product
          const response = await createArticulo({
            name: data.name,
            cost: safeCost,
            price: safePrice,
          })

          if (response.success && response.data) {
            const newProd: Product = {
              id: response.data.id,
              name: response.data.name,
              cost: response.data.cost,
              price: response.data.price,
              category: "",
              stock: 0,
              supplier: "",
              lastUpdate: new Date().toLocaleDateString(),
            }
            setProducts((prev) => [...prev, newProd])
            setIsModalOpen(false)
          } else {
            setError(response.error || "Error al crear producto")
          }
        }
      } catch (err) {
        setError("Error de conexión con Firebase")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    } else if (!data.name) {
      setError("El nombre del producto es obligatorio.")
    } else {
      setError("El costo y el precio deben ser números válidos.")
    }
  }

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return

    setIsLoading(true)
    setError(null)
    try {
      const response = await deleteArticulo(productToDelete)

      if (response.success) {
        setProducts(products.filter((p) => p.id !== productToDelete))
        setIsDeleteConfirmOpen(false)
        setProductToDelete(null)
      } else {
        setError(response.error || "Error al eliminar producto")
      }
    } catch (err) {
      setError("Error de conexión con Firebase")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = () => {
    if (products.length === 0) {
      alert("No hay productos para exportar")
      return
    }

    const data = products.map((product) => {
      // Calculamos el margen numérico: 1 - (Costo/Precio)
      let margin = 0
      if (product.price > 0 && product.cost > 0) {
         margin = (1 - (product.cost / product.price)) * 100
      }

      return {
        Nombre: product.name,
        "Costo del Producto": product.cost,
        "Precio de Venta": product.price,
        // Usamos Number() para asegurar que Excel lo detecte como número y no texto
        "Utilidad (%)": Number(margin.toFixed(2)), 
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario")

    worksheet["!cols"] = [
      { wch: 40 }, 
      { wch: 20 }, 
      { wch: 20 }, 
      { wch: 15 },
    ]

    XLSX.writeFile(workbook, `Inventario_Ferreteria_${new Date().toISOString().split("T")[0]}.xlsx`)
  }

  const handleDownloadTemplate = () => {
    const headers = ["Nombre", "Costo", "Precio"]
    const data = [
      {
        Nombre: "Ejemplo Producto",
        Costo: 100,
        Precio: 150,
      },
    ]

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Plantilla")

    worksheet["!cols"] = [{ wch: 40 }, { wch: 15 }, { wch: 15 }]

    XLSX.writeFile(workbook, "Plantilla_Importacion.xlsx")
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsProcessing(true)
    setImportStatus(null)

    try {
      const fileName = file.name.toLowerCase()
      let jsonData: Record<string, unknown>[] = []

      if (fileName.endsWith(".csv")) {
        const text = await file.text()
        const lines = text.split("\n").filter((line) => line.trim())

        if (lines.length < 2) {
          setImportStatus({
            type: "error",
            msg: "El archivo está vacío o no tiene el formato correcto",
            details: [],
          })
          setIsProcessing(false)
          return
        }

        const firstLine = lines[0]
        const delimiter = firstLine.includes(";") ? ";" : ","
        const headers = firstLine.split(delimiter).map((h) => h.trim().replace(/^["']|["']$/g, ""))

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(delimiter).map((v) => v.trim().replace(/^["']|["']$/g, ""))
          const row: Record<string, unknown> = {}
          headers.forEach((header, index) => {
            row[header] = values[index] || ""
          })
          jsonData.push(row)
        }
      } else {
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          defval: "",
        })
      }

      if (jsonData.length === 0) {
        setImportStatus({
          type: "error",
          msg: "El archivo está vacío o no tiene el formato correcto",
          details: [],
        })
        setIsProcessing(false)
        return
      }

      const importResults: string[] = []
      let successCount = 0
      let errorCount = 0
      let skippedCount = 0
      const newProducts: Product[] = []

      const existingProductNames = new Set(products.map((p) => p.name.toLowerCase().trim()))
      const firstRowKeys = Object.keys(jsonData[0])

      const findColumn = (keywords: string[]): string | undefined => {
        return firstRowKeys.find((key) => {
          const keyLower = key.toLowerCase()
          return keywords.some((kw) => keyLower.includes(kw.toLowerCase()))
        })
      }

      const nameColumn = findColumn(["nombre", "producto", "name", "descripcion"])
      const costColumn = findColumn(["costo", "cost"])
      const priceColumn = findColumn(["precio", "venta", "price"])

      if (!nameColumn) {
        setImportStatus({
          type: "error",
          msg: "No se encontró la columna de nombre del producto",
          details: [`Columnas disponibles: ${firstRowKeys.join(", ")}`],
        })
        setIsProcessing(false)
        return
      }

      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i]

        const name = (row[nameColumn!] || "") as string
        const costRaw = costColumn ? ((row[costColumn] || "0") as string) : "0"
        const cost = Number.parseFloat(costRaw.toString().replace(/[$.,]/g, "")) || 0
        const priceRaw = priceColumn ? ((row[priceColumn] || "0") as string) : "0"
        const price = Number.parseFloat(priceRaw.toString().replace(/[$.,]/g, "")) || 0

        if (!name.trim()) {
          importResults.push(`Fila ${i + 2}: Saltada (sin nombre)`)
          continue
        }

        const normalizedName = name.toLowerCase().trim()
        if (existingProductNames.has(normalizedName)) {
          skippedCount++
          importResults.push(`${name.substring(0, 30)}...: Duplicado (ya existe)`)
          continue
        }

        try {
          const response = await createArticulo({
            name: name.trim(),
            cost: cost,
            price: price,
          })

          if (response.success && response.data) {
            successCount++
            importResults.push(`${name.substring(0, 30)}...: OK`)
            newProducts.push({
              id: response.data.id,
              name: response.data.name,
              cost: response.data.cost,
              price: response.data.price,
              category: "",
              stock: 0,
              supplier: "",
              lastUpdate: new Date().toLocaleDateString("es-ES"),
            })
            existingProductNames.add(normalizedName)
          } else {
            errorCount++
            importResults.push(`${name.substring(0, 30)}...: Error`)
          }
        } catch {
          errorCount++
          importResults.push(`${name.substring(0, 30)}...: Error`)
        }
      }

      setProducts((prev) => [...prev, ...newProducts])

      const statusParts: string[] = []
      if (successCount > 0) statusParts.push(`${successCount} importados`)
      if (skippedCount > 0) statusParts.push(`${skippedCount} duplicados omitidos`)
      if (errorCount > 0) statusParts.push(`${errorCount} errores`)

      setImportStatus({
        type: errorCount === 0 && skippedCount === 0 ? "success" : errorCount === 0 ? "warning" : "error",
        msg: statusParts.join(", "),
        details: importResults.slice(0, 15),
      })

      if (errorCount === 0 && successCount > 0) {
        setTimeout(() => {
          setIsImportModalOpen(false)
          setImportStatus(null)
        }, 3000)
      }
    } catch (error) {
      console.error("[v0] Import error:", error)
      setImportStatus({
        type: "error",
        msg: "Error al procesar el archivo",
        details: ["Verifica que el archivo tenga el formato correcto"],
      })
    }

    setIsProcessing(false)
    e.target.value = ""
  }

  if (!role) {
    return <LoginScreen onLogin={handleLogin} />
  }

  if (role === "employee" && advisorView === "menu") {
    return (
      <div className="min-h-screen font-sans text-slate-200" style={{ background: "#0f172a" }}>
        <AnimatedBackground />
        <AdvisorMenu onSelect={setAdvisorView} onLogout={handleLogout} />
      </div>
    )
  }

  if (role === "employee" && advisorView === "reports") {
    return (
      <div className="min-h-screen font-sans text-slate-200" style={{ background: "#0f172a" }}>
        <AnimatedBackground />
        <AdvisorReportForm
          onBack={() => setAdvisorView("menu")}
          onSubmit={handleCreateReport}
          isLoading={isLoading}
          products={products}
          existingReports={reports}
        />
      </div>
    )
  }

  // Filtro avanzado para admin
  let filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  if (role === 'admin') {
    if (adminFilter === 'noCost') {
      filteredProducts = filteredProducts.filter((p) => !p.cost || Number(p.cost) === 0);
    } else if (adminFilter === 'noPrice') {
      filteredProducts = filteredProducts.filter((p) => !p.price || Number(p.price) === 0);
    }
  }

  return (
    <div
      className="min-h-screen font-sans text-slate-200"
      style={{ background: "#0f172a" }}
    >
      <AnimatedBackground />

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <GlassCard className="!rounded-2xl">
            <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                {role === "employee" && (
                  <button 
                    onClick={() => setAdvisorView("menu")}
                    className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <div
                  className="p-2.5 rounded-xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #1e40af 0%, #172554 100%)", // Blue
                    border: "1px solid #3b82f6",
                  }}
                >
                  <Package className="text-yellow-400 relative z-10" size={22} />
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white tracking-tight block leading-none">Inventario</span>
                  <span className="text-sm font-bold text-yellow-500 tracking-wider">PRO</span>
                </div>
                
                <span
                  className={`text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wide transition-all duration-400 ml-4`}
                  style={{
                    background:
                      role === "admin"
                        ? "rgba(234, 179, 8, 0.1)"
                        : "rgba(59, 130, 246, 0.1)",
                    border: role === "admin" ? "1px solid rgba(234, 179, 8, 0.4)" : "1px solid rgba(59, 130, 246, 0.4)",
                    color: role === "admin" ? "#facc15" : "#60a5fa",
                  }}
                >
                  {role === "admin" ? "Admin" : "Asesor"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-400 transition-all duration-400 hover:text-white"
                style={{
                  background: "transparent",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.borderColor = "transparent"
                }}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </GlassCard>
        </div>
      </nav>

      <main className="pt-32 pb-12 px-6 max-w-7xl mx-auto relative z-10">
        {error && (
          <div
            className="mb-6 p-4 rounded-xl flex items-center gap-3 animate-fade-up"
            style={{
              background: "rgba(220, 38, 38, 0.1)",
              border: "1px solid rgba(220, 38, 38, 0.3)",
            }}
          >
            <AlertCircle size={20} className="text-red-400" />
            <span className="text-red-300 font-medium">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-200 transition-colors duration-300"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Productos"
            value={products.length}
            icon={Package}
            gradient={{
              bg: "#3b82f6", // Blue
              text: "#60a5fa",
              border: "rgba(59, 130, 246, 0.3)",
              iconBg: "rgba(59, 130, 246, 0.1)",
            }}
            delay={0}
          />
          {role === "admin" && (
            <>
              <StatCard
                title="Valor Inventario"
                value={`$${products.reduce((acc, p) => acc + p.price, 0).toFixed(0)}`}
                icon={DollarSign}
                gradient={{
                  bg: "#10b981", // Green
                  text: "#34d399",
                  border: "rgba(16, 185, 129, 0.3)",
                  iconBg: "rgba(16, 185, 129, 0.1)",
                }}
                delay={100}
              />
              <StatCard
                title="Margen Promedio"
                value={(() => {
                  const validProducts = products.filter(
                    (p) => p.price > 0 && p.cost > 0 && !isNaN(p.price) && !isNaN(p.cost),
                  )
                  if (validProducts.length === 0) return "0%"
                  // Fórmula Ajustada: 1 - (Costo / Precio)
                  const avgMargin =
                    validProducts.reduce((acc, p) => acc + (1 - (p.cost / p.price)) * 100, 0) / validProducts.length
                  return `${avgMargin.toFixed(0)}%`
                })()}
                icon={TrendingUp}
                gradient={{
                  bg: "#eab308", // Yellow
                  text: "#facc15",
                  border: "rgba(234,179,8,0.3)",
                  iconBg: "rgba(234,179,8,0.1)",
                }}
                delay={200}
              />
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <GlassInput
            icon={Search}
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="lg:w-96"
          />

          {role === "admin" && (
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2 mr-4">
                <button
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 ${adminFilter === 'all' ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                  onClick={() => setAdminFilter('all')}
                  type="button"
                >
                  Todos
                </button>
                <button
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 ${adminFilter === 'noCost' ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                  onClick={() => setAdminFilter('noCost')}
                  type="button"
                >
                  Sin Costo
                </button>
                <button
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 ${adminFilter === 'noPrice' ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                  onClick={() => setAdminFilter('noPrice')}
                  type="button"
                >
                  Sin Precio Venta
                </button>
              </div>

              <button
                onClick={() => setIsReportsModalOpen(true)}
                className="flex items-center px-5 py-3.5 rounded-xl text-white font-medium transition-all duration-400 group relative"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <ClipboardList
                  size={20}
                  className="mr-2 text-red-400 group-hover:scale-110 transition-transform duration-400"
                />
                Reportes
                {reports.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-[#0f172a]">
                    {reports.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center px-5 py-3.5 rounded-xl text-white font-medium transition-all duration-400 group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(16, 185, 129, 0.1)"
                                   e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.4)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <FileSpreadsheet
                  size={20}
                  className="mr-2 text-emerald-400 group-hover:scale-110 transition-transform duration-400"
                />
                Importar
              </button>

              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/plantilla_productos.xlsx';
                  link.download = 'plantilla_productos.xlsx';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center px-5 py-3.5 rounded-xl text-white font-medium transition-all duration-400 group"
                style={{
                  background: "rgba(234, 179, 8, 0.1)",
                  border: "1px solid rgba(234, 179, 8, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(234, 179, 8, 0.1)"
                  e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.4)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <FileSpreadsheet
                  size={20}
                  className="mr-2 text-yellow-400 group-hover:scale-110 transition-transform duration-400"
                />
                Plantilla
              </button>

              <button
                onClick={handleExportData}
                className="flex items-center px-5 py-3.5 rounded-xl text-white font-medium transition-all duration-400 group"
                style={{
                   background: "rgba(255,255,255,0.03)",
                   border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)"
                  e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <Download
                  size={20}
                  className="mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-400"
                />
                Exportar
              </button>

              <GradientButton
                onClick={() => {
                  setEditingProduct(null)
                  setIsModalOpen(true)
                }}
              >
                <Plus size={20} />
                Nuevo Producto
              </GradientButton>
            </div>
          )}
        </div>

        <GlassCard className="overflow-hidden animate-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="text-slate-400 text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(15, 23, 42, 0.3)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <th className="p-6">Producto</th>
                  {role === "admin" && <th className="p-6 text-right">Costo</th>}
                  <th className="p-6 text-right">Precio Venta</th>
                  {role === "admin" && <th className="p-6 text-right">Margen (%)</th>}
                  {role === "admin" && <th className="p-6 text-right">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={role === "admin" ? 5 : 2} className="p-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <Loader2 size={48} className="text-yellow-500 animate-spin" />
                        </div>
                        <p className="text-slate-400 mt-4">Cargando inventario...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={role === "admin" ? 5 : 2} className="p-16 text-center text-slate-500">
                      <div className="flex flex-col items-center">
                        <div
                          className="p-6 rounded-full mb-4"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <Package size={48} className="opacity-30" />
                        </div>
                        <p className="text-lg font-medium">No se encontraron productos</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="group transition-all duration-300"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                      }}
                      onMouseEnter={(e) => {
                         e.currentTarget.style.background = "rgba(30, 41, 59, 0.4)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                      }}
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-transform duration-400 group-hover:scale-105"
                            style={{
                              background: "rgba(59, 130, 246, 0.1)", 
                              border: "1px solid rgba(59, 130, 246, 0.2)",
                              color: "#60a5fa"
                            }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-bold text-white text-lg transition-colors duration-400 group-hover:text-yellow-400">
                              {product.name}
                            </div>
                            <div className="text-xs text-slate-500 font-mono">ID: {product.id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>

                      {role === "admin" && (
                        <td className="p-6 text-right font-mono font-medium text-slate-300">${Number(product.cost).toFixed(2)}</td>
                      )}

                      <td className="p-6 text-right">
                        <span
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-lg font-mono font-bold text-lg"
                          style={{
                            color: "#fff",
                            textShadow: "0 0 10px rgba(255,255,255,0.2)"
                          }}
                        >
                          ${Number(product.price).toFixed(2)}
                        </span>
                      </td>
                      
                      {/* Margen (Validación Costo > 0 para evitar 100%) */}
                      {role === "admin" && (
                        <td className="p-6 text-right">
                          {product.price > 0 && product.cost > 0 ? (
                            <span
                              className="inline-block px-3 py-1.5 rounded-lg font-bold text-sm"
                              style={{
                                background:
                                  (1 - (product.cost / product.price)) * 100 >= 30
                                    ? "rgba(16, 185, 129, 0.1)"
                                    : "rgba(234, 179, 8, 0.1)",
                                border:
                                  (1 - (product.cost / product.price)) * 100 >= 30
                                    ? "1px solid rgba(16, 185, 129, 0.3)"
                                    : "1px solid rgba(234,179,8,0.3)",
                                color:
                                  (1 - (product.cost / product.price)) * 100 >= 30 ? "#34d399" : "#facc15",
                              }}
                            >
                              {((1 - (product.cost / product.price)) * 100).toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-slate-600">0%</span>
                          )}
                        </td>
                      )}

                      {role === "admin" && (
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 transition-all duration-400">
                            <button
                              onClick={() => {
                                setEditingProduct(product)
                                setIsModalOpen(true)
                              }}
                              className="p-3 rounded-lg transition-all duration-300 hover:scale-110"
                              style={{
                                background: "rgba(59, 130, 246, 0.1)",
                                border: "1px solid rgba(59, 130, 246, 0.3)",
                                color: "#60a5fa",
                              }}
                              title="Editar"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-3 rounded-lg transition-all duration-300 hover:scale-110"
                              style={{
                                background: "rgba(239, 68, 68, 0.1)",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                color: "#f87171",
                              }}
                              title="Eliminar"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </main>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(5px)",
          }}
        >
          <GlassCard className="w-full max-w-lg p-8 animate-scale-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Importación Masiva</h2>
              <button
                onClick={() => {
                  setIsImportModalOpen(false)
                  setImportStatus(null)
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div
                className="border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center relative cursor-pointer group transition-all duration-400"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  background: "rgba(15, 23, 42, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.5)"
                  e.currentTarget.style.background = "rgba(234, 179, 8, 0.05)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.4)"
                }}
              >
                <input
                  type="file"
                  accept=".xlsx, .csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isProcessing}
                />
                {isProcessing ? (
                  <div className="relative">
                    <Loader2 size={56} className="text-yellow-500 animate-spin" />
                  </div>
                ) : (
                  <div
                    className="p-5 rounded-2xl mb-4 transition-transform duration-400 group-hover:scale-110"
                    style={{
                      background: "rgba(234, 179, 8, 0.1)",
                      border: "1px solid rgba(234, 179, 8, 0.2)",
                    }}
                  >
                    <Upload size={40} className="text-yellow-500" />
                  </div>
                )}
                <h3 className="text-white font-bold text-lg mb-1">
                  {isProcessing ? "Procesando archivo..." : "Arrastra tu archivo Excel/CSV"}
                </h3>
                <p className="text-slate-500 text-sm">Soporta .xlsx y .csv</p>
              </div>

              {importStatus && (
                <div
                  className="p-5 rounded-xl flex items-start gap-3 animate-fade-up"
                  style={{
                    background:
                      importStatus.type === "success"
                        ? "rgba(16, 185, 129, 0.1)"
                        : importStatus.type === "warning"
                          ? "rgba(234, 179, 8, 0.1)"
                          : "rgba(239, 68, 68, 0.1)",
                    border:
                      importStatus.type === "success"
                        ? "1px solid rgba(16, 185, 129, 0.2)"
                        : importStatus.type === "warning"
                          ? "1px solid rgba(234, 179, 8, 0.2)"
                          : "1px solid rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      color:
                        importStatus.type === "success"
                          ? "#34d399"
                          : importStatus.type === "warning"
                            ? "#facc15"
                            : "#f87171",
                    }}
                  >
                    {importStatus.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <div>
                    <span
                      className="font-bold"
                      style={{
                        color:
                          importStatus.type === "success"
                            ? "#34d399"
                            : importStatus.type === "warning"
                              ? "#facc15"
                              : "#f87171",
                      }}
                    >
                      {importStatus.msg}
                    </span>
                    {importStatus.details && (
                      <ul className="mt-2 text-xs opacity-80 list-disc list-inside text-slate-300">
                        {importStatus.details.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Main Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct}
        isLoading={isLoading}
      />

      {/* Reports Modal */}
      <ReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
        reports={reports}
        onDelete={handleDeleteReport}
        onResolve={handleResolveReport}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(5px)",
          }}
        >
          <GlassCard className="w-full max-w-md p-6 animate-scale-in">
            <div className="flex flex-col items-center text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: "rgba(239, 68, 68, 0.1)" }}
              >
                <AlertCircle size={32} className="text-red-500" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">¿Eliminar producto?</h3>
              <p className="text-slate-400 mb-6">
                Esta acción no se puede deshacer. El producto será eliminado permanentemente del inventario.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setIsDeleteConfirmOpen(false)
                    setProductToDelete(null)
                  }}
                  className="flex-1 py-3 rounded-xl font-medium text-slate-300 hover:text-white transition-colors"
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteProduct}
                  disabled={isLoading}
                  className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{ 
                    background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
                  }}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Eliminar
                    </>
                  )}
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}