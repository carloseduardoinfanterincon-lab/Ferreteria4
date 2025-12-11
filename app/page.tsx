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
} from "lucide-react"

import * as XLSX from "xlsx"

import { getArticulos, createArticulo, updateArticulo, deleteArticulo } from "./actions/productos"

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Primary gradient orb - top left */}
    <div
      className="absolute top-[-25%] left-[-15%] w-[700px] h-[700px] rounded-full animate-pulse-glow"
      style={{
        background:
          "radial-gradient(circle at center, rgba(99, 102, 241, 0.35) 0%, rgba(79, 70, 229, 0.2) 40%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />
    {/* Secondary gradient orb - top right */}
    <div
      className="absolute top-[10%] right-[-20%] w-[600px] h-[600px] rounded-full animate-pulse-glow"
      style={{
        background:
          "radial-gradient(circle at center, rgba(6, 182, 212, 0.25) 0%, rgba(34, 211, 238, 0.15) 40%, transparent 70%)",
        filter: "blur(100px)",
        animationDelay: "1s",
      }}
    />
    {/* Tertiary gradient orb - bottom center */}
    <div
      className="absolute bottom-[-15%] left-[25%] w-[800px] h-[800px] rounded-full animate-pulse-glow"
      style={{
        background:
          "radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.12) 40%, transparent 70%)",
        filter: "blur(120px)",
        animationDelay: "2s",
      }}
    />
    {/* Accent orb - bottom right */}
    <div
      className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full animate-pulse-glow"
      style={{
        background:
          "radial-gradient(circle at center, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.08) 40%, transparent 70%)",
        filter: "blur(80px)",
        animationDelay: "1.5s",
      }}
    />
    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
    {/* Noise texture overlay */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      }}
    />
  </div>
)

const GlassCard = ({
  children,
  className = "",
  hover = false,
  glow = false,
}: { children: React.ReactNode; className?: string; hover?: boolean; glow?: boolean }) => (
  <div
    className={`
      relative overflow-hidden
      rounded-[28px]
      transition-all duration-500 ease-out
      ${hover ? "hover:-translate-y-2 hover:scale-[1.01] cursor-pointer" : ""}
      ${glow ? "animate-glow" : ""}
      ${className}
    `}
    style={{
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.08) 100%)",
      backdropFilter: "blur(24px) saturate(180%)",
      WebkitBackdropFilter: "blur(24px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.12)",
      boxShadow: hover
        ? "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.1) inset"
        : "0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.1) inset",
    }}
  >
    {/* Top highlight */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    {/* Inner glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
    {/* Content */}
    <div className="relative z-10">{children}</div>
    {/* Hover overlay */}
    {hover && (
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, transparent 50%)",
        }}
      />
    )}
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
      bg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)",
      hover: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #818cf8 100%)",
      shadow: "0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
      hoverShadow: "0 12px 40px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(255,255,255,0.15) inset",
    },
    secondary: {
      bg: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      hover: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)",
      shadow: "0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1) inset",
      hoverShadow: "0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.15) inset",
    },
    danger: {
      bg: "linear-gradient(135deg, #ef4444 0%, #f43f5e 50%, #ef4444 100%)",
      hover: "linear-gradient(135deg, #f87171 0%, #fb7185 50%, #f87171 100%)",
      shadow: "0 8px 32px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
      hoverShadow: "0 12px 40px rgba(239, 68, 68, 0.5), 0 0 0 1px rgba(255,255,255,0.15) inset",
    },
    success: {
      bg: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #10b981 100%)",
      hover: "linear-gradient(135deg, #34d399 0%, #2dd4bf 50%, #34d399 100%)",
      shadow: "0 8px 32px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
      hoverShadow: "0 12px 40px rgba(16, 185, 129, 0.5), 0 0 0 1px rgba(255,255,255,0.15) inset",
    },
  }

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    default: "px-6 py-3.5 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  }

  const v = variants[variant]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        text-white font-semibold
        ${sizes[size]}
        transition-all duration-400 ease-out
        hover:scale-[1.03] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        group
        ${className}
      `}
      style={{
        background: v.bg,
        backgroundSize: "200% 100%",
        boxShadow: v.shadow,
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
      {/* Shimmer effect on hover */}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        }}
      />
    </button>
  )
}

const GlassInput = ({
  icon: Icon,
  ...props
}: { icon?: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative group">
    {Icon && (
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-all duration-400 text-slate-400 group-focus-within:text-indigo-400">
        <Icon size={20} />
      </div>
    )}
    <input
      {...props}
      className={`
        w-full
        rounded-2xl
        ${Icon ? "pl-14" : "pl-5"} pr-5 py-4
        text-white placeholder-slate-400
        transition-all duration-400 ease-out
        focus:outline-none
        ${props.className || ""}
      `}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      onFocus={(e) => {
        e.target.style.border = "1px solid rgba(99, 102, 241, 0.5)"
        e.target.style.boxShadow =
          "0 4px 30px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 4px rgba(99, 102, 241, 0.1)"
        e.target.style.background = "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        e.target.style.border = "1px solid rgba(255,255,255,0.1)"
        e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
        e.target.style.background = "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
        props.onBlur?.(e)
      }}
    />
  </div>
)

const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string
  onConfirm: () => void
  onCancel: () => void
}) => (
  <div
    className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    style={{
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(8px)",
    }}
  >
    <GlassCard className="w-full max-w-sm p-8 animate-scale-in">
      <div className="flex items-center gap-4 mb-5">
        <div
          className="p-3.5 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(244, 63, 94, 0.1) 100%)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          }}
        >
          <AlertCircle size={24} className="text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Confirmar Eliminación</h3>
      </div>
      <p className="text-slate-300 mb-8 leading-relaxed">{message}</p>
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="flex-1 py-3.5 px-4 rounded-2xl text-slate-300 transition-all duration-400"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
          }}
        >
          Cancelar
        </button>
        <GradientButton variant="danger" onClick={onConfirm} className="flex-1">
          Eliminar
        </GradientButton>
      </div>
    </GlassCard>
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
    if (password === "admin123") {
      onLogin("admin")
    } else {
      setError("Contraseña incorrecta")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 font-sans"
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)",
      }}
    >
      <AnimatedBackground />

      <div
        className={`w-full max-w-md relative z-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <GlassCard className="overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Branding Header */}
            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto relative overflow-hidden animate-glow"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)",
                    boxShadow: "0 8px 40px rgba(99, 102, 241, 0.5)",
                  }}
                >
                  <Package size={40} className="text-white relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-xl flex items-center justify-center animate-bounce"
                  style={{
                    background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
                    boxShadow: "0 4px 20px rgba(236, 72, 153, 0.5)",
                  }}
                >
                  <Sparkles size={16} className="text-white" />
                </div>
              </div>
              <h1
                className="text-4xl font-bold mb-3 tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 50%, #a5b4fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Inventario Pro
              </h1>
              <p className="text-slate-400 font-light text-lg">Gestión de hardware moderna</p>
            </div>

            {/* Access Options */}
            <div className="space-y-5">
              <p className="text-sm text-slate-500 text-center mb-6 uppercase tracking-wider">
                Seleccione su tipo de acceso
              </p>

              {/* Employee Button */}
              <button
                onClick={() => onLogin("employee")}
                className="w-full group relative flex items-center p-5 rounded-2xl transition-all duration-400"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(34, 211, 238, 0.05) 100%)"
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.3)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(6, 182, 212, 0.2)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div
                  className="p-3.5 rounded-xl transition-all duration-400 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(34, 211, 238, 0.1) 100%)",
                    border: "1px solid rgba(6, 182, 212, 0.2)",
                  }}
                >
                  <Users size={24} className="text-cyan-400" />
                </div>
                <div className="ml-4 text-left flex-1">
                  <h3 className="text-white font-semibold text-lg">Empleado</h3>
                  <p className="text-sm text-slate-400">Solo consulta de precios</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 text-cyan-400 translate-x-[-8px] group-hover:translate-x-0">
                  →
                </div>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div
                  className="flex-1 h-px"
                  style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)" }}
                />
                <span className="text-xs text-slate-500 uppercase tracking-widest">o</span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)" }}
                />
              </div>

              {/* Admin Form */}
              <form onSubmit={handleAdminLogin} className="space-y-5">
                <div
                  className="flex items-center gap-4 mb-5 p-4 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                    border: "1px solid rgba(99, 102, 241, 0.15)",
                  }}
                >
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)",
                    }}
                  >
                    <Shield size={22} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Administrador</h3>
                    <p className="text-sm text-slate-400">Acceso total y edición</p>
                  </div>
                </div>

                <GlassInput
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                />

                {error && (
                  <div
                    className="flex items-center gap-3 text-red-400 text-sm px-4 py-3.5 rounded-xl animate-fade-up"
                    style={{
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(244, 63, 94, 0.08) 100%)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                    }}
                  >
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                <GradientButton type="submit" className="w-full">
                  Ingresar como Admin
                </GradientButton>
              </form>
            </div>

            {/* Footer Tags */}
            <div
              className="mt-8 pt-6 flex justify-center gap-3 flex-wrap"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {["Tiempo Real", "Seguro", "Rápido"].map((tag, i) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-xs text-slate-400 transition-all duration-400 hover:text-slate-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    animationDelay: `${i * 100}ms`,
                  }}
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

// --- Product Data Type ---
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
  gradient: { bg: string; border: string; iconBg: string }
  delay?: number
}) => (
  <GlassCard hover className="p-6 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-4xl font-bold text-white tracking-tight">{value}</p>
      </div>
      <div
        className="p-4 rounded-2xl transition-transform duration-400 hover:scale-110"
        style={{
          background: gradient.iconBg,
          border: `1px solid ${gradient.border}`,
        }}
      >
        <Icon size={28} style={{ color: gradient.bg }} />
      </div>
    </div>
  </GlassCard>
)

// --- Main Dashboard ---
export default function HardwareApp() {
  const [role, setRole] = useState<"admin" | "employee" | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const [newProduct, setNewProduct] = useState({
    name: "",
    cost: 0,
    price: 0,
    category: "",
    stock: 0,
    supplier: "",
    lastUpdate: "",
  })
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [importStatus, setImportStatus] = useState<{
    type: "success" | "error" | "warning"
    msg: string
    details?: string[]
  } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (role) {
      loadProducts()
    }
  }, [role])

  const loadProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getArticulos()
      if (response.success && response.data) {
        setProducts(response.data)
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

  const handleLogin = (selectedRole: "admin" | "employee") => {
    setRole(selectedRole)
  }

  const handleLogout = () => {
    setRole(null)
    setSearchTerm("")
    setProducts([])
  }

  const handleAddProduct = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (newProduct.name && newProduct.cost >= 0 && newProduct.price >= 0) {
      // Allow 0 for cost/price
      setIsLoading(true)
      setError(null)
      try {
        const response = await createArticulo({
          name: newProduct.name,
          cost: newProduct.cost,
          price: newProduct.price,
          category: newProduct.category,
          stock: newProduct.stock,
          supplier: newProduct.supplier,
          lastUpdate: newProduct.lastUpdate,
        })

        if (response.success && response.data) {
          setProducts((prev) => [...prev, response.data!])
          setNewProduct({ name: "", cost: 0, price: 0, category: "", stock: 0, supplier: "", lastUpdate: "" })
          setIsModalOpen(false)
        } else {
          setError(response.error || "Error al crear producto")
        }
      } catch (err) {
        setError("Error de conexión con Firebase")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    } else if (!newProduct.name) {
      setError("El nombre del producto es obligatorio.")
    } else {
      setError("El costo y el precio deben ser números válidos.")
    }
  }

  const handleEditProduct = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (editingProduct && editingProduct.name && editingProduct.cost >= 0 && editingProduct.price >= 0) {
      setIsLoading(true)
      setError(null)
      try {
        const response = await updateArticulo(editingProduct.id, {
          name: editingProduct.name,
          cost: editingProduct.cost,
          price: editingProduct.price,
          category: editingProduct.category,
          stock: editingProduct.stock,
          supplier: editingProduct.supplier,
          lastUpdate: editingProduct.lastUpdate,
        })

        if (response.success) {
          setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
          setEditingProduct(null)
          setIsModalOpen(false)
        } else {
          setError(response.error || "Error al actualizar producto")
        }
      } catch (err) {
        setError("Error de conexión con Firebase")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    } else if (!editingProduct?.name) {
      setError("El nombre del producto es obligatorio.")
    } else {
      setError("El costo y el precio deben ser números válidos.")
    }
  }

  const handleDeleteProduct = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await deleteArticulo(id)

      if (response.success) {
        setProducts(products.filter((p) => p.id !== id))
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

  const downloadTemplate = () => {
    const headers = ["NOMBRE DEL PRODUCTO", "COSTO", "PRECIO DE VENTA"]
    const exampleData = [
      { "NOMBRE DEL PRODUCTO": "Ejemplo Producto 1", COSTO: 1000, "PRECIO DE VENTA": 1500 },
      { "NOMBRE DEL PRODUCTO": "Ejemplo Producto 2", COSTO: 2000, "PRECIO DE VENTA": 3000 },
    ]

    const worksheet = XLSX.utils.json_to_sheet(exampleData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Plantilla")

    worksheet["!cols"] = [{ wch: 40 }, { wch: 15 }, { wch: 20 }]

    XLSX.writeFile(workbook, "Plantilla_Inventario.xlsx")
  }

  const handleExportData = () => {
    if (products.length === 0) {
      alert("No hay productos para exportar")
      return
    }

    // Create worksheet data with headers
    const headers = ["ID", "Nombre", "Categoría", "Stock", "Precio", "Proveedor", "Última Actualización"]
    const data = products.map((product) => ({
      ID: product.id,
      Nombre: product.name,
      Categoría: product.category || "Sin categoría",
      Stock: product.stock,
      Precio: product.price,
      Proveedor: product.supplier || "Sin proveedor",
      "Última Actualización": product.lastUpdate || "Sin fecha",
    }))

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario")

    // Set column widths for better readability
    worksheet["!cols"] = [
      { wch: 25 }, // ID
      { wch: 30 }, // Nombre
      { wch: 20 }, // Categoría
      { wch: 10 }, // Stock
      { wch: 15 }, // Precio
      { wch: 25 }, // Proveedor
      { wch: 20 }, // Última Actualización
    ]

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Inventario_Ferreteria_${new Date().toISOString().split("T")[0]}.xlsx`)
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

        // Detect delimiter (semicolon or comma)
        const firstLine = lines[0]
        const delimiter = firstLine.includes(";") ? ";" : ","

        // Parse headers
        const headers = firstLine.split(delimiter).map((h) => h.trim().replace(/^["']|["']$/g, ""))

        console.log("[v0] Detected headers:", headers)
        console.log("[v0] Using delimiter:", delimiter)

        // Parse rows
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(delimiter).map((v) => v.trim().replace(/^["']|["']$/g, ""))
          const row: Record<string, unknown> = {}
          headers.forEach((header, index) => {
            row[header] = values[index] || ""
          })
          jsonData.push(row)
        }
      } else {
        // Excel file - use XLSX parser
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          defval: "",
        })
      }

      console.log("[v0] Parsed data sample:", jsonData.slice(0, 3))

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
      console.log("[v0] Available columns:", firstRowKeys)

      // Find matching column names (case-insensitive, partial match)
      const findColumn = (keywords: string[]): string | undefined => {
        return firstRowKeys.find((key) => {
          const keyLower = key.toLowerCase()
          return keywords.some((kw) => keyLower.includes(kw.toLowerCase()))
        })
      }

      const nameColumn = findColumn(["nombre", "producto", "name", "descripcion"])
      const costColumn = findColumn(["costo", "cost"])
      const priceColumn = findColumn(["precio", "venta", "price"])

      console.log("[v0] Matched columns - Name:", nameColumn, "Cost:", costColumn, "Price:", priceColumn)

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

        // Parse cost - handle formats like "$1.500" or "1500"
        const costRaw = costColumn ? ((row[costColumn] || "0") as string) : "0"
        const cost = Number.parseFloat(costRaw.toString().replace(/[$.,]/g, "")) || 0

        // Parse price - handle formats like "$2.000" or "2000"
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
              stock: 0,
              price: response.data.price,
              category: undefined,
              supplier: undefined,
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

      // Update the products state with newly imported products
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

      // Auto-close modal after 3 seconds on success (only if no errors)
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
    // Reset file input
    e.target.value = ""
  }

  if (!role) {
    return <LoginScreen onLogin={handleLogin} />
  }

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div
      className="min-h-screen font-sans text-slate-200"
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)",
      }}
    >
      <AnimatedBackground />

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <GlassCard className="!rounded-2xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="p-2.5 rounded-xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
                  }}
                >
                  <Package className="text-white relative z-10" size={22} />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Inventario Pro</span>
                <span
                  className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all duration-400`}
                  style={{
                    background:
                      role === "admin"
                        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)"
                        : "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(34, 211, 238, 0.1) 100%)",
                    border: role === "admin" ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid rgba(6, 182, 212, 0.3)",
                    color: role === "admin" ? "#a5b4fc" : "#67e8f9",
                  }}
                >
                  {role === "admin" ? "✦ Administrador" : "◇ Empleado"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 transition-all duration-400"
                style={{
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)"
                  e.currentTarget.style.color = "#fff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#94a3b8"
                }}
              >
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </GlassCard>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="pt-32 pb-12 px-6 max-w-7xl mx-auto relative z-10">
        {error && (
          <div
            className="mb-6 p-4 rounded-2xl flex items-center gap-3 animate-fade-up"
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(244, 63, 94, 0.05) 100%)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <AlertCircle size={20} className="text-red-400" />
            <span className="text-red-300">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-300 transition-colors duration-300"
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
              bg: "#a78bfa",
              border: "rgba(167, 139, 250, 0.3)",
              iconBg: "linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)",
            }}
            delay={0}
          />
          <StatCard
            title="Valor Inventario"
            value={`$${products.reduce((acc, p) => acc + p.price, 0).toFixed(0)}`}
            icon={DollarSign}
            gradient={{
              bg: "#34d399",
              border: "rgba(52, 211, 153, 0.3)",
              iconBg: "linear-gradient(135deg, rgba(52, 211, 153, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)",
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
              const avgMargin =
                validProducts.reduce((acc, p) => acc + ((p.price - p.cost) / p.price) * 100, 0) / validProducts.length
              return `${avgMargin.toFixed(0)}%`
            })()}
            icon={TrendingUp}
            gradient={{
              bg: "#fbbf24",
              border: "rgba(251, 191, 36, 0.3)",
              iconBg: "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)",
            }}
            delay={200}
          />
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
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center px-5 py-3.5 rounded-2xl text-white transition-all duration-400 group"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)"
                  e.currentTarget.style.borderColor = "rgba(52, 211, 153, 0.3)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(52, 211, 153, 0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <FileSpreadsheet
                  size={20}
                  className="mr-2 text-emerald-400 group-hover:scale-110 transition-transform duration-400"
                />
                Importar
              </button>

              <button
                onClick={handleExportData}
                className="flex items-center px-5 py-3.5 rounded-2xl text-white transition-all duration-400 group"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)"
                  e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59, 130, 246, 0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
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
                  setNewProduct({ name: "", cost: 0, price: 0, category: "", stock: 0, supplier: "", lastUpdate: "" })
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
                  className="text-slate-400 text-xs uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(to right, rgba(255,255,255,0.05), transparent)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <th className="p-6 font-semibold">Producto</th>
                  {role === "admin" && <th className="p-6 font-semibold text-right">Costo</th>}
                  <th className="p-6 font-semibold text-right">Precio Venta</th>
                  <th className="p-6 font-semibold text-right">Margen</th>
                  {role === "admin" && <th className="p-6 font-semibold text-right">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <Loader2 size={48} className="text-indigo-500 animate-spin" />
                          <div className="absolute inset-0 animate-ping opacity-30">
                            <Loader2 size={48} className="text-indigo-500" />
                          </div>
                        </div>
                        <p className="text-slate-400 mt-4">Cargando productos desde Firebase...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-16 text-center text-slate-500">
                      <div className="flex flex-col items-center">
                        <div
                          className="p-6 rounded-3xl mb-4"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <Package size={48} className="opacity-30" />
                        </div>
                        <p className="text-lg">No se encontraron productos</p>
                        <p className="text-sm text-slate-600 mt-1">Intenta con otra búsqueda</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="group transition-all duration-400"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, rgba(99, 102, 241, 0.08), transparent)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                      }}
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-400 font-bold text-sm transition-transform duration-400 group-hover:scale-110"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)",
                              border: "1px solid rgba(99, 102, 241, 0.2)",
                            }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-lg transition-colors duration-400 group-hover:text-indigo-300">
                              {product.name}
                            </div>
                            <div className="text-xs text-slate-500 font-mono">ID: {product.id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>

                      {role === "admin" && (
                        <td className="p-6 text-right font-mono text-slate-300">${Number(product.cost).toFixed(2)}</td>
                      )}

                      <td className="p-6 text-right">
                        <span
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl font-mono font-bold"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(52, 211, 153, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)",
                            border: "1px solid rgba(52, 211, 153, 0.2)",
                            color: "#34d399",
                            boxShadow: "0 4px 20px rgba(52, 211, 153, 0.1)",
                          }}
                        >
                          <DollarSign size={14} />
                          {Number(product.price).toFixed(2)}
                        </span>
                      </td>

                      <td className="p-6 text-right">
                        {role === "admin" && product.price > 0 ? (
                          <span
                            className="inline-block px-3 py-1.5 rounded-xl font-medium text-sm"
                            style={{
                              background:
                                ((product.price - product.cost) / product.price) * 100 >= 30
                                  ? "linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)"
                                  : "linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)",
                              border:
                                ((product.price - product.cost) / product.price) * 100 >= 30
                                  ? "1px solid rgba(52, 211, 153, 0.3)"
                                  : "1px solid rgba(251, 191, 36, 0.3)",
                              color:
                                ((product.price - product.cost) / product.price) * 100 >= 30 ? "#34d399" : "#fbbf24",
                            }}
                          >
                            {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-slate-500">---</span>
                        )}
                      </td>

                      {role === "admin" && (
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 group-hover:translate-x-0">
                            <button
                              onClick={() => {
                                setEditingProduct(product)
                                setIsModalOpen(true)
                              }}
                              className="p-3 rounded-xl transition-all duration-400 hover:scale-110"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)",
                                border: "1px solid rgba(59, 130, 246, 0.2)",
                                color: "#60a5fa",
                              }}
                              title="Editar"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-3 rounded-xl transition-all duration-400 hover:scale-110"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          <GlassCard className="w-full max-w-md p-8 animate-scale-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 transition-all duration-300"
                style={{ background: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.color = "#fff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#94a3b8"
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Nombre del Producto <span className="text-red-400">*</span>
                </label>
                <GlassInput
                  autoFocus
                  required
                  type="text"
                  placeholder="Ej: Taladro Profesional"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, name: e.target.value })
                      : setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Costo ($)</label>
                  <GlassInput
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={editingProduct ? editingProduct.cost : newProduct.cost}
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({ ...editingProduct, cost: Number(e.target.value) })
                        : setNewProduct({ ...newProduct, cost: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Venta ($)</label>
                  <GlassInput
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={editingProduct ? editingProduct.price : newProduct.price}
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                        : setNewProduct({ ...newProduct, price: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isLoading}
                  className="flex-1 py-3.5 px-4 rounded-2xl text-slate-300 transition-all duration-400 disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)"
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  }}
                >
                  Cancelar
                </button>
                <GradientButton type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Guardando...
                    </>
                  ) : editingProduct ? (
                    "Guardar Cambios"
                  ) : (
                    "Crear Producto"
                  )}
                </GradientButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {isImportModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
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
                className="p-2 rounded-xl text-slate-400 transition-all duration-300"
                style={{ background: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.color = "#fff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#94a3b8"
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Upload Area */}
              <div
                className="border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center relative cursor-pointer group transition-all duration-400"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.4)"
                  e.currentTarget.style.background = "rgba(99, 102, 241, 0.05)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
                  e.currentTarget.style.background = "transparent"
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
                    <Loader2 size={56} className="text-indigo-500 animate-spin" />
                    <div className="absolute inset-0 animate-ping opacity-30">
                      <Loader2 size={56} className="text-indigo-500" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="p-5 rounded-2xl mb-4 transition-transform duration-400 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.08) 100%)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    <Upload size={40} className="text-indigo-400" />
                  </div>
                )}
                <h3 className="text-white font-semibold text-lg mb-1">
                  {isProcessing ? "Procesando archivo..." : "Arrastra tu archivo aquí"}
                </h3>
                <p className="text-slate-500 text-sm">Soporta .xlsx y .csv</p>
                <p className="text-slate-600 text-xs mt-2">Columnas: NOMBRE, COSTO, PRECIO DE VENTA</p>
              </div>

              {/* Status */}
              {importStatus && (
                <div
                  className="p-5 rounded-2xl flex items-start gap-3 animate-fade-up"
                  style={{
                    background:
                      importStatus.type === "success"
                        ? "linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)"
                        : importStatus.type === "warning"
                          ? "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)"
                          : "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)",
                    border:
                      importStatus.type === "success"
                        ? "1px solid rgba(52, 211, 153, 0.2)"
                        : importStatus.type === "warning"
                          ? "1px solid rgba(251, 191, 36, 0.2)"
                          : "1px solid rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <div
                    className="p-2 rounded-xl"
                    style={{
                      background:
                        importStatus.type === "success"
                          ? "rgba(52, 211, 153, 0.2)"
                          : importStatus.type === "warning"
                            ? "rgba(251, 191, 36, 0.2)"
                            : "rgba(239, 68, 68, 0.2)",
                      color:
                        importStatus.type === "success"
                          ? "#34d399"
                          : importStatus.type === "warning"
                            ? "#fbbf24"
                            : "#f87171",
                    }}
                  >
                    {importStatus.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <div>
                    <span
                      className="font-medium"
                      style={{
                        color:
                          importStatus.type === "success"
                            ? "#34d399"
                            : importStatus.type === "warning"
                              ? "#fbbf24"
                              : "#f87171",
                      }}
                    >
                      {importStatus.msg}
                    </span>
                    {importStatus.details && (
                      <ul className="mt-2 text-xs opacity-80 list-disc list-inside">
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
    </div>
  )
}
