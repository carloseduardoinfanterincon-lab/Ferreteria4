import React, { useState } from "react"
import { ArrowLeft, ClipboardList, Loader2, CheckCircle, Trash2 } from "lucide-react"
import { AnimatedBackground } from "../shared/AnimatedBackground"
import { GlassCard } from "../shared/GlassCard"
import { Reporte } from "../../app/actions/reportes"

export const AdminReportsScreen = ({
  reports,
  onBack,
  onDelete,
  onResolve,
  isLoading,
}: {
  reports: Reporte[]
  onBack: () => void
  onDelete: (id: string) => void
  onResolve: (id: string) => void
  isLoading: boolean
}) => {
  const [tab, setTab] = useState<"pending" | "history">("pending")

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
    <div className="min-h-screen font-sans text-slate-200" style={{ background: "#0f172a" }}>
      <AnimatedBackground />

      <div className="relative z-10 pt-8 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={18} />
            Volver
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
              <ClipboardList size={22} className="text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Reportes de Agotados</h1>
              <p className="text-slate-400 text-sm">Pendientes e historial</p>
            </div>
          </div>

          <div className="w-[88px]" />
        </div>

        {/*
          Vista sin limitaciones de alto: dejamos que la página haga scroll.
          (Antes: h-[calc(100vh-150px)] + overflow interno)
        */}
        <GlassCard className="p-6 sm:p-8">
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

          <div className="space-y-4">
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
                          type="button"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button
                          onClick={() => onDelete(report.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Eliminar"
                          type="button"
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
                        type="button"
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
    </div>
  )
}
