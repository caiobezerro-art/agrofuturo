"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  CheckCircle, 
  Lock,
  Leaf,
  Droplets,
  Recycle,
  TreePine,
  Zap,
  Award
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Challenge {
  id: string
  title: string
  description: string
  points: number
  icon: typeof Leaf
  completed: boolean
  category: "agua" | "energia" | "biodiversidade" | "residuos"
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: typeof Trophy
  unlocked: boolean
  requirement: number
}

const initialChallenges: Challenge[] = [
  {
    id: "1",
    title: "Guardião das Águas",
    description: "Implemente um sistema de captação de água da chuva",
    points: 100,
    icon: Droplets,
    completed: false,
    category: "agua",
  },
  {
    id: "2",
    title: "Energia Limpa",
    description: "Utilize energia solar em pelo menos 30% das operações",
    points: 150,
    icon: Zap,
    completed: false,
    category: "energia",
  },
  {
    id: "3",
    title: "Biodiversidade +",
    description: "Plante 100 árvores nativas em sua propriedade",
    points: 200,
    icon: TreePine,
    completed: false,
    category: "biodiversidade",
  },
  {
    id: "4",
    title: "Zero Desperdício",
    description: "Composte 100% dos resíduos orgânicos da fazenda",
    points: 120,
    icon: Recycle,
    completed: false,
    category: "residuos",
  },
  {
    id: "5",
    title: "Irrigação Inteligente",
    description: "Reduza o consumo de água em 40% com gotejamento",
    points: 180,
    icon: Droplets,
    completed: false,
    category: "agua",
  },
  {
    id: "6",
    title: "Corredor Ecológico",
    description: "Conecte áreas de preservação com corredores verdes",
    points: 250,
    icon: Leaf,
    completed: false,
    category: "biodiversidade",
  },
]

const achievements: Achievement[] = [
  {
    id: "a1",
    title: "Iniciante Verde",
    description: "Complete seu primeiro desafio",
    icon: Star,
    unlocked: false,
    requirement: 1,
  },
  {
    id: "a2",
    title: "Eco Guerreiro",
    description: "Complete 3 desafios",
    icon: Award,
    unlocked: false,
    requirement: 3,
  },
  {
    id: "a3",
    title: "Mestre Sustentável",
    description: "Complete todos os desafios",
    icon: Trophy,
    unlocked: false,
    requirement: 6,
  },
]

const rankings = [
  { name: "Fazenda São João", points: 1250, position: 1 },
  { name: "Sítio Esperança", points: 1180, position: 2 },
  { name: "Chácara Verde", points: 1050, position: 3 },
  { name: "Rancho Sustentável", points: 920, position: 4 },
  { name: "Você", points: 0, position: 5, isUser: true },
]

export function GamificationSection() {
  const [challenges, setChallenges] = useState(initialChallenges)
  const [totalPoints, setTotalPoints] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])

  const completedCount = challenges.filter((c) => c.completed).length

  const toggleChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newCompleted = !c.completed
          if (newCompleted) {
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 2000)
          }
          return { ...c, completed: newCompleted }
        }
        return c
      })
    )
  }

  useEffect(() => {
    const points = challenges
      .filter((c) => c.completed)
      .reduce((acc, c) => acc + c.points, 0)
    setTotalPoints(points)

    // Check achievements
    const completed = challenges.filter((c) => c.completed).length
    const newUnlocked: string[] = []
    achievements.forEach((a) => {
      if (completed >= a.requirement) {
        newUnlocked.push(a.id)
      }
    })
    setUnlockedAchievements(newUnlocked)
  }, [challenges])

  const getCategoryColor = (category: Challenge["category"]) => {
    switch (category) {
      case "agua":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "energia":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "biodiversidade":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "residuos":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    }
  }

  return (
    <section id="gamificacao" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: "50vw",
                  y: "50vh",
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: Math.random() * 2,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ["#22c55e", "#3b82f6", "#eab308", "#f97316"][
                    Math.floor(Math.random() * 4)
                  ],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
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
            <Gamepad2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Gamificação</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Desafios
            <span className="block text-primary">Ecológicos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Complete desafios sustentáveis, ganhe pontos e conquiste medalhas.
            Suba no ranking e mostre seu compromisso com o meio ambiente!
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <div className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border text-center">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-bold">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">Pontos Totais</div>
          </div>
          <div className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border text-center">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-bold">
              {completedCount}/{challenges.length}
            </div>
            <div className="text-sm text-muted-foreground">Desafios Completos</div>
          </div>
          <div className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border text-center">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-bold">
              {unlockedAchievements.length}/{achievements.length}
            </div>
            <div className="text-sm text-muted-foreground">Conquistas</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Challenges */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Desafios Disponíveis</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    challenge.completed
                      ? "bg-primary/10 border-primary/30"
                      : "bg-card/50 border-border hover:border-primary/30"
                  }`}
                  onClick={() => toggleChallenge(challenge.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl border ${getCategoryColor(
                        challenge.category
                      )}`}
                    >
                      <challenge.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{challenge.title}</h4>
                        <span className="text-xs font-bold text-primary">
                          +{challenge.points}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            challenge.completed
                              ? "bg-primary border-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {challenge.completed && (
                            <CheckCircle className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {challenge.completed ? "Completo!" : "Clique para completar"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Conquistas
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement) => {
                  const isUnlocked = unlockedAchievements.includes(achievement.id)
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={false}
                      animate={{
                        scale: isUnlocked ? [1, 1.05, 1] : 1,
                      }}
                      className={`p-3 rounded-xl border flex items-center gap-3 ${
                        isUnlocked
                          ? "bg-primary/10 border-primary/30"
                          : "bg-muted/50 border-border opacity-60"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isUnlocked ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {isUnlocked ? (
                          <achievement.icon className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Ranking */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Ranking
              </h3>
              <div className="space-y-2">
                {rankings.map((rank) => (
                  <div
                    key={rank.position}
                    className={`p-3 rounded-xl flex items-center justify-between ${
                      rank.isUser
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          rank.position === 1
                            ? "bg-yellow-500 text-yellow-950"
                            : rank.position === 2
                            ? "bg-gray-300 text-gray-700"
                            : rank.position === 3
                            ? "bg-orange-400 text-orange-950"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {rank.position}
                      </span>
                      <span className="text-sm font-medium">
                        {rank.isUser ? "Você" : rank.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {rank.isUser ? totalPoints : rank.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
