import React from "react"
import { GlassCard } from "./GlassCard"

export const StatCard = ({
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
