import React, { useState } from "react"
import { ArrowLeft, MessageSquarePlus, CheckCircle, ClipboardList, Loader2 } from "lucide-react"
import { GlassCard } from "../shared/GlassCard"
import { GlassInput } from "../shared/GlassInput"
import { GradientButton } from "../shared/GradientButton"
import { Product } from "../../types/product"
import { Reporte } from "../../app/actions/reportes"

export const AdvisorReportForm = ({
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
          <GlassCard className="p-8 h-[calc(100%-76px)] flex flex-col min-h-0">
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
              className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-3 overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
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
