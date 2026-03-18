"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Check, ArrowRight, MapPin, Phone, Mail, Sparkles, Brain, Zap, Calculator, BookOpen, Clock, Users, Award, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  viewport: { once: true },
}

const DoodleStar = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function DenmarkPage() {
  const [activeTab, setActiveTab] = useState<"abacus" | "mental" | "mathematics">("abacus")
  const [language, setLanguage] = useState<"en" | "da">("da") // Default to Danish

  const mainCourses = [
    {
      name: {
        en: "Homac Prep Course",
        da: "Homac Forberedelseskursus"
      },
      color: "from-amber-400 to-yellow-500",
      icon: Sparkles,
      image: "/classroom-kids-learning-abacus-fun.jpg",
      description: {
        en: "Designed for young learners to build early number skills and confidence through fun and engaging activities.",
        da: "Designet til unge elever for at opbygge tidlige tal-færdigheder og selvtillid gennem sjove og engagerende aktiviteter."
      },
      highlights: {
        en: ["Age 4–5 years", "Early numeracy", "Confidence building"],
        da: ["Alder 4–5 år", "Tidlig talforståelse", "Opbygning af selvtillid"]
      },
    },
    {
      name: {
        en: "Homac Reception",
        da: "Homac Modtagerklasse"
      },
      color: "from-teal-400 to-emerald-500",
      icon: Brain,
      image: "/teacher-children-learning-cards-number-sense.jpg",
      description: {
        en: "Focuses on developing number sense and counting skills essential for early academic success.",
        da: "Fokuserer på at udvikle talforståelse og tællefærdigheder, der er essentielle for tidlig akademisk succes."
      },
      highlights: {
        en: ["Age 5–6 years", "Number sense", "Counting skills"],
        da: ["Alder 5–6 år", "Talforståelse", "Tællefærdigheder"]
      },
    },
    {
      name: {
        en: "Homac Key Stages",
        da: "Homac Niveauer"
      },
      color: "from-rose-400 to-pink-500",
      icon: Zap,
      image: "/diverse-kids-group-learning-mental-arithmetic.jpg",
      description: {
        en: "Structured multi-stage program that strengthens mental arithmetic and problem-solving skills.",
        da: "Struktureret flertrinsprogram, der styrker hovedregning og problemløsningsevner."
      },
      highlights: {
        en: ["Age 6–12 years", "Mental arithmetic", "Skill progression"],
        da: ["Alder 6–12 år", "Hovedregning", "Færdighedsudvikling"]
      },
    },
  ]

  const tabs = [
    { 
      id: "abacus" as const, 
      label: { en: "Abacus", da: "Kugleramme" }, 
      icon: Calculator, 
      color: "bg-primary hover:bg-primary/90" 
    },
    { 
      id: "mental" as const, 
      label: { en: "Mental Arithmetic", da: "Hovedregning" }, 
      icon: Brain, 
      color: "bg-slate-600 hover:bg-slate-700" 
    },
    {
      id: "mathematics" as const,
      label: { en: "Mathematics and Abacus", da: "Matematik og Kugleramme" },
      icon: BookOpen,
      color: "bg-teal-500 hover:bg-teal-600",
    },
  ]

  const tabContent = {
    abacus: {
      title: { en: "What is Abacus?", da: "Hvad er en Kugleramme?" },
      paragraphs: {
        en: [
          "Abacus is a traditional calculation tool made of beads arranged on rods within a frame. It has been used for centuries, even before pen and paper, and is still practiced in many parts of the world today, including Japanese, Chinese, and Russian methods.",
          "Abacus learning makes numbers fun and engaging for children. By using touch and visual memory, children understand calculations more easily, helping them learn faster and with greater confidence.",
        ],
        da: [
          "Kuglerammen er et traditionelt regneredskab bestående af perler arrangeret på pinde inden for en ramme. Den har været brugt i århundreder, selv før papir og blyant, og praktiseres stadig i mange dele af verden i dag, herunder japanske, kinesiske og russiske metoder.",
          "Kugleramme-læring gør tal sjove og engagerende for børn. Ved at bruge berøring og visuel hukommelse forstår børn beregninger lettere, hvilket hjælper dem med at lære hurtigere og med større selvtillid.",
        ]
      },
    },
    mental: {
      title: { en: "Mental Arithmetic Training", da: "Træning i Hovedregning" },
      intro: {
        en: "Mental Arithmetic training helps children perform calculations quickly and accurately without using tools like calculators or abacus. It strengthens both the right and left sides of the brain, improving memory, speed, and concentration from an early age.",
        da: "Hovedregningstræning hjælper børn med at udføre beregninger hurtigt og præcist uden brug af værktøjer som lommeregnere eller kuglerammer. Det styrker både højre og venstre side af hjernen og forbedrer hukommelse, hastighed og koncentration fra en tidlig alder.",
      },
      points: {
        en: [
          "Develops strong calculation skills using visual and mental techniques.",
          "Improves concentration, memory, and problem-solving abilities.",
          "Encourages whole-brain development through visualization and practice.",
          "Boosts confidence by enabling children to solve problems independently.",
          "Reduces fear of numbers and builds a positive attitude towards mathematics.",
          "Enhances academic performance across all subjects.",
          "Provides lifelong skills such as focus, speed, and time management.",
        ],
        da: [
          "Udvikler stærke regnefærdigheder ved hjælp af visuelle og mentale teknikker.",
          "Forbedrer koncentration, hukommelse og problemløsningsevner.",
          "Fremmer helhjernet udvikling gennem visualisering og praksis.",
          "Øger selvtilliden ved at gøre børn i stand til at løse problemer selvstændigt.",
          "Reducerer talangst og opbygger en positiv holdning til matematik.",
          "Forbedrer akademiske præstationer på tværs af alle fag.",
          "Giver livslange færdigheder som fokus, hurtighed og tidsstyring.",
        ]
      },
    },
    mathematics: {
      title: { en: "Mathematics and Abacus", da: "Matematik og Kugleramme" },
      paragraphs: {
        en: [
          "Mathematics plays a vital role in everyday life and future careers. Early exposure to numbers helps children build confidence and develop logical thinking skills essential for academic success.",
          "Many children develop a fear of mathematics due to its abstract nature. Learning maths through abacus introduces numbers in a friendly and visual way, helping overcome this fear.",
          "Abacus training improves concentration, speed, accuracy, and memory. It strengthens cognitive development and enhances a child's ability to visualise and solve problems effectively.",
          "By stimulating the right side of the brain, abacus learning helps children master mental calculations and apply logical thinking in real-life situations.",
        ],
        da: [
          "Matematik spiller en afgørende rolle i hverdagen og fremtidige karrierer. Tidlig eksponering for tal hjælper børn med at opbygge selvtillid og udvikle logiske tænkeevner, der er essentielle for akademisk succes.",
          "Mange børn udvikler angst for matematik på grund af dets abstrakte natur. At lære matematik gennem kuglerammen introducerer tal på en venlig og visuel måde, hvilket hjælper med at overvinde denne frygt.",
          "Kugleramme-træning forbedrer koncentration, hastighed, nøjagtighed og hukommelse. Det styrker kognitiv udvikling og forbedrer barnets evne til at visualisere og løse problemer effektivt.",
          "Ved at stimulere højre side af hjernen hjælper kugleramme-læring børn med at mestre mentale beregninger og anvende logisk tænkning i virkelige situationer.",
        ]
      },
    },
  }

  const denmarkInfo = {
    contact: {
      name: "Mr. Charles",
      address: "Tagensvej 180, 3<br/>2200 København N<br/>Danmark",
      phone: "+45 91 88 70 34",
      email: "homacuk@gmail.com",
    },
    stats: {
      en: [
        { value: "500+", label: "Happy Students", icon: Users },
        { value: "10+", label: "Years Experience", icon: Award },
        { value: "5", label: "Active Locations", icon: Globe },
        { value: "98%", label: "Satisfied Parents", icon: Check },
      ],
      da: [
        { value: "500+", label: "Glade Studerende", icon: Users },
        { value: "10+", label: "Års Erfaring", icon: Award },
        { value: "5", label: "Aktive Lokationer", icon: Globe },
        { value: "98%", label: "Tilfredse Forældre", icon: Check },
      ]
    },
    soonToBe: {
      en: {
        badge: "Soon to be in Denmark",
        title: "Opening",
        subtitle: "Soon in Copenhagen",
        description: "Homac is coming to Denmark! Contact us for more information about our upcoming courses and registration.",
        waitlist: "Join Waitlist",
        contact: "Contact Us"
      },
      da: {
        badge: "Kommer Snart i Danmark",
        title: "Åbner",
        subtitle: "Snart i København",
        description: "Homac er på vej til Danmark! Kontakt os for mere information om vores kommende kurser og tilmelding.",
        waitlist: "Skriv dig på venteliste",
        contact: "Kontakt Os"
      }
    }
  }

  return (
    <>
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-500 to-red-600 py-16 relative overflow-hidden">
          <motion.div
            className="absolute top-10 right-20 text-white/30"
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
          >
            <DoodleStar className="w-20 h-20" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🇩🇰</span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">Homac Danmark</h1>
                </div>
                <p className="text-white/90 text-lg max-w-2xl">
                  {language === 'en' 
                    ? 'Become part of our community in Denmark. Abacus learning for children of all ages.'
                    : 'Bliv en del af vores fællesskab i Danmark. Kugleramme-læring for børn i alle aldre.'}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'en' ? 'bg-white text-red-600' : 'bg-white/20 text-white hover:bg-white/30'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('da')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'da' ? 'bg-white text-red-600' : 'bg-white/20 text-white hover:bg-white/30'}`}
                >
                  Dansk
                </button>
                <div className="text-white text-lg font-semibold">
                  <Link href="/" className="hover:underline">
                    {language === 'en' ? 'Home' : 'Hjem'}
                  </Link>
                  <span className="mx-2">/</span>
                  <span>Danmark</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Soon to be Section - Bilingual */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/danish-flag-pattern.png')] opacity-5" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
                {denmarkInfo.soonToBe[language].badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-brown mb-4">
                {denmarkInfo.soonToBe[language].title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                  {denmarkInfo.soonToBe[language].subtitle}
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {denmarkInfo.soonToBe[language].description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="rounded-3xl border-2 border-red-200 bg-white shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                  {/* Left side - Danish flag colors */}
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 md:p-10 flex flex-col items-center justify-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-20 -mb-20" />
                    
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6">
                      <span className="text-5xl">🇩🇰</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-center mb-2">Homac Danmark</h3>
                    <p className="text-red-100 text-center">
                      {language === 'en' ? 'Abacus learning for children' : 'Kugleramme-læring for børn'}
                    </p>
                    
                    <div className="mt-8 flex items-center gap-2 text-red-100 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{language === 'en' ? 'Opening soon - Autumn 2025' : 'Åbner snart - Efterår 2025'}</span>
                    </div>
                  </div>
                  
                  {/* Right side - Contact details */}
                  <div className="p-8 md:p-10">
                    <h4 className="text-xl font-bold text-brown mb-6">
                      {language === 'en' ? 'Contact us for more information' : 'Kontakt os for mere information'}
                    </h4>
                    
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{language === 'en' ? 'Contact Person' : 'Kontaktperson'}</p>
                          <p className="font-semibold text-gray-800">{denmarkInfo.contact.name}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{language === 'en' ? 'Address' : 'Adresse'}</p>
                          <p className="font-semibold text-gray-800 leading-relaxed">
                            Tagensvej 180, 3<br />
                            2200 København N<br />
                            Danmark
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{language === 'en' ? 'Phone' : 'Telefon'}</p>
                          <a href={`tel:${denmarkInfo.contact.phone}`} className="font-semibold text-gray-800 hover:text-red-600 transition-colors">
                            {denmarkInfo.contact.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <a href={`mailto:${denmarkInfo.contact.email}`} className="font-semibold text-gray-800 hover:text-red-600 transition-colors">
                            {denmarkInfo.contact.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mb-4">
                        {language === 'en' 
                          ? 'We look forward to welcoming you and your child to Homac Denmark. Join our waitlist to be notified when registration opens.'
                          : 'Vi glæder os til at byde dig og dit barn velkommen til Homac Danmark. Skriv dig op på vores venteliste for at få besked, når vi åbner for tilmelding.'}
                      </p>
                      <Link href="/contact">
                        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl py-6 font-bold shadow-lg">
                          {denmarkInfo.soonToBe[language].waitlist}
                          <ArrowRight className="ml-2" size={20} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
            >
              {denmarkInfo.stats[language].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="text-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                >
                  <stat.icon className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Methods Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 text-amber-300/40"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{
              rotate: { repeat: Number.POSITIVE_INFINITY, duration: 20 },
              scale: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
            }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-teal-300/40"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </motion.div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-brown mb-4">
                {language === 'en' ? 'Learn About' : 'Lær Om'}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                  {language === 'en' ? 'Our Methods' : 'Vores Metoder'}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">
                {language === 'en' 
                  ? 'Discover the power of abacus-based learning' 
                  : 'Oplev styrken ved kugleramme-baseret læring'}
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="flex flex-wrap gap-2 mb-8 justify-center">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center gap-2 ${
                    activeTab === tab.id ? tab.color + " shadow-lg scale-105" : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  whileHover={{ scale: activeTab === tab.id ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon size={18} />
                  {tab.label[language]}
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 rounded-3xl shadow-xl border-t-4 border-primary bg-white">
                  {activeTab === "abacus" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-brown flex items-center gap-3">
                        <Calculator className="text-primary" />
                        {tabContent.abacus.title[language]}
                      </h3>
                      {tabContent.abacus.paragraphs[language].map((para, idx) => (
                        <p key={idx} className="text-muted-foreground leading-relaxed text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {activeTab === "mental" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-brown flex items-center gap-3">
                        <Brain className="text-slate-600" />
                        {tabContent.mental.title[language]}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base">{tabContent.mental.intro[language]}</p>
                      <div className="space-y-4 mt-6">
                        {tabContent.mental.points[language].map((point, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-3"
                          >
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-amber-500 flex items-center justify-center">
                                <Check size={14} className="text-white" />
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-sm">{point}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "mathematics" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-brown flex items-center gap-3">
                        <BookOpen className="text-teal-500" />
                        {tabContent.mathematics.title[language]}
                      </h3>
                      {tabContent.mathematics.paragraphs[language].map((para, idx) => (
                        <p key={idx} className="text-muted-foreground leading-relaxed text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brown mb-4">
                {language === 'en' ? 'Courses In' : 'Kurser I'}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  HOMAC {language === 'en' ? 'Denmark' : 'Danmark'}
                </span>
              </h2>
              <div className="flex justify-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-400" />
                <div className="w-4 h-4 rounded-full bg-teal-400" />
                <div className="w-4 h-4 rounded-full bg-rose-400" />
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {mainCourses.map((course, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="h-full" whileHover={{ y: -10 }}>
                  <Card
                    className={`bg-gradient-to-br ${course.color} text-white h-full overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all`}
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.name[language]}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <motion.div
                        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
                      >
                        <course.icon size={24} className="text-white" />
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4 text-center">{course.name[language]}</h3>
                      <p className="text-sm leading-relaxed mb-6 text-white/90">{course.description[language]}</p>

                      <div className="space-y-2">
                        {course.highlights[language].map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                              <Check size={12} className="text-white" />
                            </div>
                            <span className="text-white/90 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Global Presence Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-16 text-brown">
              {language === 'en' ? 'Our' : 'Vores'}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                {language === 'en' ? 'Global Presence' : 'Globale Tilstedeværelse'}
              </span>
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  country: "Sri Lanka",
                  name: "Mrs. Shiyamala Kannan",
                  address: "15/200, Gunanandha Mawatha ,Colombo - 13,  Sri Lanka ",
                  phone: "+94 77 207 8083",
                  email: "homaclanka@gmail.com",
                  color: "border-amber-400",
                },
                {
                  country: "India",
                  name: "Mrs. K. Ajitha",
                  address: "495/c.sai children's academy   Near Abi Mahal, Palani road,  Oddanchatram,      Dindigul district,Tamilnadu",
                  phone: "9841735034",
                  email: "homacindia@gmail.com",
                  color: "border-teal-400",
                },
                {
                  country: "Switzerland",
                  name: "Mr. J Sounderrajan",
                  address: "Schaffhauserstrasse 263, 8500 Frauenfeld",
                  phone: "+41 76 420 05 70",
                  email: "info@homacswiss.ch",
                  color: "border-rose-400",
                },
                {
                  country: "Denmark",
                  name: "Mr. Charles",
                  address: "Tagensvej 180, 32200 København,Denmark",
                  phone: "+45 91 88 70 34",
                  email: "homacuk@gmail.com",
                  color: "border-sky-400",
                },
              ].map((location, idx) => (
                <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <Card
                    className={`p-6 border-t-4 ${location.color} h-full rounded-2xl hover:shadow-xl transition-all`}
                  >
                    <h3 className="text-xl font-bold text-brown mb-4">{location.country}</h3>
                    <div className="space-y-3 text-sm">
                      <p className="font-semibold text-primary">{location.name}</p>
                      <div className="flex gap-2">
                        <MapPin size={16} className="text-amber-500 flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">{location.address}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Phone size={16} className="text-teal-500" />
                        <a href={`tel:${location.phone}`} className="text-muted-foreground hover:text-primary">
                          {location.phone}
                        </a>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Mail size={16} className="text-rose-500" />
                        <a
                          href={`mailto:${location.email}`}
                          className="text-muted-foreground hover:text-primary truncate"
                        >
                          {location.email}
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {language === 'en' ? 'Ready to Start Your Journey?' : 'Klar til at starte jeres rejse?'}
              </h2>
              <p className="text-lg text-white/90 mb-8">
                {language === 'en'
                  ? 'Contact us today for more information about our upcoming courses in Copenhagen.'
                  : 'Kontakt os i dag for mere information om vores kommende kurser i København.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-white/90 font-bold rounded-full px-10 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  >
                    {denmarkInfo.soonToBe[language].contact}
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
                <a href={`tel:${denmarkInfo.contact.phone}`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-full px-10 py-6"
                  >
                    {language === 'en' ? 'Call' : 'Ring'}: {denmarkInfo.contact.phone}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}