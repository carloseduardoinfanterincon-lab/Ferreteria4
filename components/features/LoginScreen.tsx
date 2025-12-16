import React, { useState, useEffect } from "react"
import { Package, Sparkles, Users, Shield, AlertCircle } from "lucide-react"
import { AnimatedBackground } from "../shared/AnimatedBackground"
import { GlassCard } from "../shared/GlassCard"
import { GlassInput } from "../shared/GlassInput"
import { GradientButton } from "../shared/GradientButton"

export const LoginScreen = ({ onLogin }: { onLogin: (role: "admin" | "employee") => void }) => {
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
