import React, { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { GlassCard } from "../shared/GlassCard"
import { GlassInput } from "../shared/GlassInput"
import { GradientButton } from "../shared/GradientButton"
import { Product } from "../../types/product"

export interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, "id" | "lastUpdate">) => Promise<void>
  initialData?: Product | null
  isLoading: boolean
}

export const ProductModal = ({ isOpen, onClose, onSave, initialData, isLoading }: ProductModalProps) => {
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
      stock: 0, // Default stock
      category: "", // Default category
      supplier: "", // Default supplier
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
