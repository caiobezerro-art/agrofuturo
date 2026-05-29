"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Map, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Region {
  id: string
  name: string
  path: string
  production: string
  rainfall: string
  soilQuality: string
  sustainability: number
  mainCrops: string[]
}

const paranaRegions: Region[] = [
  {
    id: "norte",
    name: "Norte do Paraná",
    path: "M180,40 L320,40 L340,80 L320,120 L180,120 L160,80 Z",
    production: "3.2 milhões ton/ano",
    rainfall: "1.400 mm/ano",
    soilQuality: "Terra Roxa - Excelente",
    sustainability: 85,
    mainCrops: ["Café", "Soja", "Milho"],
  },
  {
    id: "oeste",
    name: "Oeste do Paraná",
    path: "M40,100 L160,100 L180,160 L160,220 L40,220 L20,160 Z",
    production: "5.8 milhões ton/ano",
    rainfall: "1.800 mm/ano",
    soilQuality: "Latossolo - Muito Boa",
    sustainability: 92,
    mainCrops: ["Soja", "Milho", "Trigo"],
  },
  {
    id: "central",
    name: "Centro do Paraná",
    path: "M160,120 L320,120 L340,180 L320,240 L160,240 L140,180 Z",
    production: "2.5 milhões ton/ano",
    rainfall: "1.600 mm/ano",
    soilQuality: "Cambissolo - Boa",
    sustainability: 78,
    mainCrops: ["Soja", "Feijão", "Milho"],
  },
  {
    id: "sudoeste",
    name: "Sudoeste do Paraná",
    path: "M40,220 L160,220 L180,280 L160,340 L40,340 L20,280 Z",
    production: "1.8 milhões ton/ano",
    rainfall: "2.000 mm/ano",
    soilQuality: "Nitossolo - Muito Boa",
    sustainability: 88,
    mainCrops: ["Milho", "Soja", "Feijão"],
  },
  {
    id: "sudeste",
    name: "Sudeste/Leste do Paraná",
    path: "M320,180 L460,180 L480,260 L460,340 L320,340 L300,260 Z",
    production: "1.2 milhões ton/ano",
    rainfall: "1.500 mm/ano",
    soilQuality: "Organossolo - Moderada",
    sustainability: 72,
    mainCrops: ["Hortaliças", "Frutas", "Grãos"],
  },
]

export function MapSection() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const getSustainabilityColor = (score: number) => {
    if (score >= 85) return "fill-green-500/70 hover:fill-green-500"
    if (score >= 75) return "fill-emerald-500/70 hover:fill-emerald-500"
    return "fill-yellow-500/70 hover:fill-yellow-500"
  }

  return (
    <section id="mapa" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Map className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Mapa Interativo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Regiões Agrícolas
            <span className="block text-primary">do Paraná</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore as diferentes regiões do Paraná e descubra dados de produção,
            sustentabilidade e características de cada área.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Map SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="p-6 rounded-3xl bg-card/50 backdrop-blur-sm border border-border">
              <svg
                viewBox="0 0 500 380"
                className="w-full h-auto"
                style={{ maxHeight: "400px" }}
              >
                {/* Background */}
                <rect
                  x="0"
                  y="0"
                  width="500"
                  height="380"
                  fill="transparent"
                />
                
                {/* Regions */}
                {paranaRegions.map((region) => (
                  <motion.path
                    key={region.id}
                    d={region.path}
                    className={`cursor-pointer transition-all duration-300 stroke-background stroke-2 ${getSustainabilityColor(region.sustainability)} ${
                      hoveredRegion === region.id ? "opacity-100" : "opacity-80"
                    }`}
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  />
                ))}

                {/* Region Labels */}
                {paranaRegions.map((region) => {
                  const pathMatch = region.path.match(/M(\d+),(\d+)/)
                  if (!pathMatch) return null
                  const x = parseInt(pathMatch[1]) + 60
                  const y = parseInt(pathMatch[2]) + 50
                  return (
                    <text
                      key={`label-${region.id}`}
                      x={x}
                      y={y}
                      className="fill-foreground text-[10px] font-medium pointer-events-none"
                      textAnchor="middle"
                    >
                      {region.name.split(" ")[0]}
                    </text>
                  )
                })}
              </svg>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <span>Alta Sustentabilidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-emerald-500" />
                  <span>Média</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-500" />
                  <span>Em Desenvolvimento</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {selectedRegion ? (
              <div className="p-6 rounded-3xl bg-card/80 backdrop-blur-sm border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">{selectedRegion.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedRegion(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sustainability Score */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Índice de Sustentabilidade</span>
                    <span className="text-2xl font-bold text-primary">
                      {selectedRegion.sustainability}%
                    </span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedRegion.sustainability}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-background border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Produção Anual</div>
                    <div className="font-semibold">{selectedRegion.production}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Precipitação</div>
                    <div className="font-semibold">{selectedRegion.rainfall}</div>
                  </div>
                </div>

                {/* Soil Quality */}
                <div className="p-4 rounded-xl bg-background border border-border mb-4">
                  <div className="text-sm text-muted-foreground mb-1">Qualidade do Solo</div>
                  <div className="font-semibold">{selectedRegion.soilQuality}</div>
                </div>

                {/* Main Crops */}
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Principais Cultivos</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedRegion.mainCrops.map((crop) => (
                      <span
                        key={crop}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border border-dashed text-center">
                <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Selecione uma Região</h3>
                <p className="text-muted-foreground">
                  Clique em uma região do mapa para ver informações detalhadas sobre
                  produção, sustentabilidade e características do solo.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
