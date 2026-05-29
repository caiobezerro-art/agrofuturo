"use client"

import { motion } from "framer-motion"
import { 
  Leaf, 
  Github, 
  Linkedin, 
  Mail,
  Heart,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

const footerLinks = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#home" },
      { label: "Tecnologia", href: "#tecnologia" },
      { label: "Sustentabilidade", href: "#sustentabilidade" },
      { label: "Simulador", href: "#simulador" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Dashboard", href: "#dashboard" },
      { label: "Mapa Interativo", href: "#mapa" },
      { label: "IA Agrícola", href: "#ia" },
      { label: "Desafios", href: "#gamificacao" },
    ],
  },
  {
    title: "Sobre",
    links: [
      { label: "O Projeto", href: "#" },
      { label: "Agrinho 2026", href: "#" },
      { label: "Paraná", href: "#" },
      { label: "Contato", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="#home" className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full" />
                <Leaf className="h-8 w-8 text-primary relative" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">Agrinho</span>
                <span className="text-[10px] text-muted-foreground leading-none">2026</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Plataforma educativa demonstrando como a tecnologia pode transformar 
              o agronegócio sustentável no Paraná.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            2026 Agrinho. Feito com{" "}
            <Heart className="inline h-3 w-3 text-red-500 fill-red-500" /> para o
            Paraná.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Concurso Agrinho 2026</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Tema: Agro Forte, Futuro Sustentável
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
