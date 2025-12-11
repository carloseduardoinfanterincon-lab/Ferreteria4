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
    {/* Fondo base azul marino profundo (Industrial) */}
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(to bottom right, #0f172a 0%, #172554 100%)", // Slate-900 to Blue-950
      }}
    />
    
    {/* Un solo destello sutil amarillo en la esquina superior derecha */}
    <div
      className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-10"
      style={{
        background: "radial-gradient(circle, rgba(234, 179, 8, 1) 0%, transparent 70%)", // Yellow-500
        filter: "blur(80px)",
      }}
    />
    
    {/* Grid muy sutil y limpio */}
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
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
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
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(4px)",
    }}
  >
    <GlassCard className="w-full max-w-sm p-8 animate-scale-in">
      <div className="flex items-center gap-4 mb-5">
        <div
          className="p-3.5 rounded-xl"
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(185, 28, 28, 0.1) 100%)",
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
          className="flex-1 py-3.5 px-4 rounded-xl text-slate-300 transition-all duration-400"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onMouseEnter={(e) => {
             e.currentTarget.style.background = "rgba(255,255,255,0.1)"
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.background = "rgba(255,255,255,0.05)"
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
            {/* Branding Header */}
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
                Inventario <span className="text-yellow-400">Pro</span>
              </h1>
              <p className="text-slate-400 font-medium text-lg">Sistema de Ferretería</p>
            </div>

            {/* Access Options */}
            <div className="space-y-5">
              <p className="text-sm text-slate-500 text-center mb-6 uppercase tracking-wider font-bold">
                Seleccione su acceso
              </p>

              {/* Asesor Button (Formerly Empleado) */}
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
                  {/* Changed "Empleado" to "Asesor" */}
                  <h3 className="text-white font-bold text-lg">Asesor</h3>
                  <p className="text-sm text-slate-400">Consulta de precios y stock</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 text-yellow-400 translate-x-[-8px] group-hover:translate-x-0">
                  →
                </div>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="text-xs text-slate-500 uppercase font-bold">o</span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              {/* Admin Form */}
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

            {/* Footer Tags */}
            <div
              className="mt-8 pt-6 flex justify-center gap-3 flex-wrap"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {["Control de Stock", "Caja", "Facturación"].map((tag, i) => (
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
        const mappedProducts: Product[] = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          cost: item.cost,
          price: item.price,
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
      setIsLoading(true)
      setError(null)
      try {
        const response = await createArticulo({
          name: newProduct.name,
          cost: newProduct.cost,
          price: newProduct.price,
        })

        if (response.success && response.data) {
          const newProd: Product = {
            id: response.data.id,
            name: response.data.name,
            cost: response.data.cost,
            price: response.data.price,
            category: newProduct.category,
            stock: newProduct.stock,
            supplier: newProduct.supplier,
            lastUpdate: new Date().toLocaleDateString(),
          }
          setProducts((prev) => [...prev, newProd])
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

  const handleExportData = () => {
    if (products.length === 0) {
      alert("No hay productos para exportar")
      return
    }

    const data = products.map((product) => ({
      Nombre: product.name,
      "Costo del Producto": product.cost,
      "Precio de Venta": product.price,
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario")

    worksheet["!cols"] = [
      { wch: 40 }, 
      { wch: 20 }, 
      { wch: 20 }, 
    ]

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

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div
      className="min-h-screen font-sans text-slate-200"
      style={{
        background: "#0f172a", // Fallback
      }}
    >
      <AnimatedBackground />

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <GlassCard className="!rounded-2xl">
            <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
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
                  {/* Changed label from Empleado to Asesor */}
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

      {/* --- Main Content --- */}
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
          {/* Only show these stats for Admin */}
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
                  const avgMargin =
                    validProducts.reduce((acc, p) => acc + ((p.price - p.cost) / p.price) * 100, 0) / validProducts.length
                  return `${avgMargin.toFixed(0)}%`
                })()}
                icon={TrendingUp}
                gradient={{
                  bg: "#eab308", // Yellow
                  text: "#facc15",
                  border: "rgba(234, 179, 8, 0.3)",
                  iconBg: "rgba(234, 179, 8, 0.1)",
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
            <div className="flex flex-wrap gap-4">
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
                  className="text-slate-400 text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(15, 23, 42, 0.3)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <th className="p-6">Producto</th>
                  {role === "admin" && <th className="p-6 text-right">Costo</th>}
                  <th className="p-6 text-right">Precio Venta</th>
                  {/* Only show Margin column header for Admin */}
                  {role === "admin" && <th className="p-6 text-right">Margen</th>}
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
                      
                      {/* Only show Margin value for Admin */}
                      {role === "admin" && (
                        <td className="p-6 text-right">
                          {product.price > 0 ? (
                            <span
                              className="inline-block px-3 py-1.5 rounded-lg font-bold text-sm"
                              style={{
                                background:
                                  ((product.price - product.cost) / product.price) * 100 >= 30
                                    ? "rgba(16, 185, 129, 0.1)"
                                    : "rgba(234, 179, 8, 0.1)",
                                border:
                                  ((product.price - product.cost) / product.price) * 100 >= 30
                                    ? "1px solid rgba(16, 185, 129, 0.3)"
                                    : "1px solid rgba(234, 179, 8, 0.3)",
                                color:
                                  ((product.price - product.cost) / product.price) * 100 >= 30 ? "#34d399" : "#facc15",
                              }}
                            >
                              {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-slate-600">---</span>
                          )}
                        </td>
                      )}

                      {role === "admin" && (
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 group-hover:translate-x-0">
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

      {/* Modals remain unchanged visually but are part of the full code */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(5px)",
          }}
        >
          <GlassCard className="w-full max-w-md p-8 animate-scale-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 transition-colors hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">
                  Nombre del Producto <span className="text-yellow-500">*</span>
                </label>
                <GlassInput
                  autoFocus
                  required
                  type="text"
                  placeholder="Ej: Taladro Percutor 1/2"
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
                  <label className="block text-sm font-bold text-slate-400 mb-2">Costo ($)</label>
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
                  <label className="block text-sm font-bold text-slate-400 mb-2">Venta ($)</label>
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
              {/* Upload Area */}
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

              {/* Status */}
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
    </div>
  )
}