import React from "react"
import { Search, ClipboardList, LogOut } from "lucide-react"

export const AdvisorMenu = ({
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
