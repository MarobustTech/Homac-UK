"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Users, 
  Target, 
  Globe, 
  Award,
  Sparkles,
  BookOpen,
  Heart,
  Star,
  Coffee,
  GraduationCap,
  PartyPopper,
  Presentation,
  Trophy,
  Mail,
  Phone,
  Youtube
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

const DoodleStar = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const DoodleCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
  </svg>
)

export default function UpcomingEvents() {
  const highlights = [
    { text: "Expert Led Workshops", icon: Users, color: "bg-amber-500" },
    { text: "Proven Methodology", icon: Target, color: "bg-teal-500" },
    { text: "Small Group Sizes", icon: Heart, color: "bg-rose-500" },
    { text: "Multiple Locations", icon: MapPin, color: "bg-sky-500" },
  ]

  const competitionLocations = [
    { weekend: "1st Weekend", location: "Colombo", date: "September 2026" },
    { weekend: "2nd Weekend", location: "Central Province", date: "September 2026" },
    { weekend: "3rd Weekend", location: "Eastern Province", date: "September 2026" },
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20">
        {/* Hero Section with Animations */}
        <section className="min-h-[60vh] flex items-center relative overflow-hidden py-20 bg-gradient-to-br from-amber-50 via-white to-teal-50">
          {/* Animated decorations */}
          <motion.div
            className="absolute top-32 left-10 text-amber-300"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <DoodleStar className="w-12 h-12" />
          </motion.div>
          <motion.div
            className="absolute top-48 right-20 text-teal-300"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <DoodleCircle className="w-16 h-16" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-1/4 text-rose-300"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
          <motion.div
            className="absolute top-40 right-1/3 text-sky-300"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Calendar className="w-8 h-8" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-brown">
                Upcoming{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                    Events
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                Join us for workshops, competitions, and events that bring mathematics to life. 
                Build real skills through our proven abacus and mental arithmetic education.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center"
                  >
                    <motion.div
                      className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-lg font-semibold text-brown">{item.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Sri Lanka Competition Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <Badge className="bg-emerald-500 text-white text-lg px-6 py-2 mb-4">Sri Lanka Edition</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-brown mb-4">Upcoming Competition 2026</h2>
              <p className="text-xl text-muted-foreground"></p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {competitionLocations.map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 text-center border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-emerald-600" />
                    </div>
                    <Badge className="bg-emerald-500 text-white mb-3">{item.weekend}</Badge>
                    <h3 className="text-2xl font-bold text-brown mb-2">{item.location}</h3>
                    <p className="text-emerald-600 font-semibold">{item.date}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Award Ceremony */}
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <Card className="p-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center">
                <Award className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">Grand Award Ceremony</h3>
                <p className="text-2xl mb-2">October 3rd, 2026</p>
                <p className="text-lg opacity-90">Celebrating excellence and achievement</p>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Flyer Image Section - Reduced height */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="relative"
            >
              <Card className="rounded-3xl border-2 border-gray-100 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/flyer copy.jpg.jpeg"
                    alt="HOMAC UK Event Flyer - Competition and Award Ceremony"
                    fill
                    className="object-contain bg-gray-50"
                    priority
                  />
                </div>
                
                {/* Download Button */}
                <div className="p-4 text-center border-t border-gray-100">
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all"
                    onClick={() => window.open('/images/flyer copy.jpg.jpeg', '_blank')}
                  >
                    Download Flyer
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-brown mb-8">Get in Touch</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Call Us</p>
                    <a href="tel:+447301950469" className="text-lg font-semibold hover:text-amber-600 transition-colors">
                      +44 7301 950469
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Email Us</p>
                    <a href="mailto:homacuk@gmail.com" className="text-lg font-semibold hover:text-teal-600 transition-colors">
                      homacuk@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Visit Our Website</p>
                    <a href="https://homacuk.co.uk" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-purple-600 transition-colors">
                      homacuk.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Newsletter */}
        <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-white/10"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            style={{ transform: 'skewX(-20deg)' }}
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Be the first to know about new workshops, competitions, and special events.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:border-white"
                />
                <Button className="bg-white text-amber-600 hover:bg-gray-100 rounded-full px-8 py-3">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}