"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { 
  BarChart3, 
  TrendingUp, 
  Droplets, 
  Leaf,
  Zap,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"

const productionData = [
  { month: "Jan", soja: 4200, milho: 3800, trigo: 2400 },
  { month: "Fev", soja: 4500, milho: 4100, trigo: 2200 },
  { month: "Mar", soja: 4800, milho: 4300, trigo: 2800 },
  { month: "Abr", soja: 5200, milho: 4600, trigo: 3100 },
  { month: "Mai", soja: 5500, milho: 4900, trigo: 3400 },
  { month: "Jun", soja: 5800, milho: 5200, trigo: 3600 },
]

const waterData = [
  { name: "Irrigação Tradicional", value: 60, color: "var(--chart-5)" },
  { name: "Irrigação Inteligente", value: 25, color: "var(--chart-1)" },
  { name: "Água da Chuva", value: 15, color: "var(--chart-2)" },
]

const emissionsData = [
  { year: "2020", emissao: 100, meta: 100 },
  { year: "2021", emissao: 92, meta: 95 },
  { year: "2022", emissao: 85, meta: 90 },
  { year: "2023", emissao: 78, meta: 85 },
  { year: "2024", emissao: 72, meta: 80 },
  { year: "2025", emissao: 65, meta: 75 },
  { year: "2026", emissao: 58, meta: 70 },
]

const energyData = [
  { mes: "Jan", solar: 320, eolica: 180, tradicional: 100 },
  { mes: "Fev", solar: 350, eolica: 200, tradicional: 90 },
  { mes: "Mar", solar: 380, eolica: 220, tradicional: 80 },
  { mes: "Abr", solar: 420, eolica: 250, tradicional: 70 },
  { mes: "Mai", solar: 450, eolica: 280, tradicional: 60 },
  { mes: "Jun", solar: 480, eolica: 300, tradicional: 50 },
]

const metrics = [
  { 
    icon: TrendingUp, 
    label: "Produtividade", 
    value: "+23%", 
    change: "vs. ano anterior",
    color: "text-chart-1"
  },
  { 
    icon: Droplets, 
    label: "Economia de Água", 
    value: "42%", 
    change: "menos consumo",
    color: "text-chart-2"
  },
  { 
    icon: Leaf, 
    label: "CO₂ Reduzido", 
    value: "850t", 
    change: "este ano",
    color: "text-chart-1"
  },
  { 
    icon: Zap, 
    label: "Energia Limpa", 
    value: "78%", 
    change: "da matriz",
    color: "text-chart-3"
  },
]

export function DashboardSection() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [key, setKey] = useState(0)

  const refreshData = () => {
    setIsAnimating(true)
    setKey(prev => prev + 1)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  return (
    <section id="dashboard" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Dashboard Analítico</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">
              Dados em Tempo Real
            </h2>
          </div>
          <Button
            variant="outline"
            onClick={refreshData}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isAnimating ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-colors"
            >
              <metric.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${metric.color} mb-3`} />
              <div className="text-2xl sm:text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm font-medium">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.change}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6" key={key}>
          {/* Production Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
          >
            <h3 className="text-lg font-semibold mb-4">Produção por Cultura (ton/ha)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="soja" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="milho" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="trigo" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-1" />
                <span>Soja</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-2" />
                <span>Milho</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-3" />
                <span>Trigo</span>
              </div>
            </div>
          </motion.div>

          {/* Emissions Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
          >
            <h3 className="text-lg font-semibold mb-4">Redução de Emissões de CO₂</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="emissao"
                    stroke="var(--chart-1)"
                    strokeWidth={3}
                    dot={{ fill: "var(--chart-1)", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="meta"
                    stroke="var(--chart-5)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-1" />
                <span>Emissão Real</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-chart-5" style={{ borderTop: "2px dashed" }} />
                <span>Meta</span>
              </div>
            </div>
          </motion.div>

          {/* Water Usage Pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
          >
            <h3 className="text-lg font-semibold mb-4">Uso de Água por Método</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={waterData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {waterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm">
              {waterData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Energy Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border"
          >
            <h3 className="text-lg font-semibold mb-4">Matriz Energética (MWh)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mes" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="solar"
                    stackId="1"
                    stroke="var(--chart-3)"
                    fill="var(--chart-3)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="eolica"
                    stackId="1"
                    stroke="var(--chart-2)"
                    fill="var(--chart-2)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="tradicional"
                    stackId="1"
                    stroke="var(--chart-5)"
                    fill="var(--chart-5)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-3" />
                <span>Solar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-2" />
                <span>Eólica</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-5" />
                <span>Tradicional</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
