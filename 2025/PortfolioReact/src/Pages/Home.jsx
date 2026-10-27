import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight, Code, Smartphone, Server, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
    const skills = [
        { icon: Code, name: "Frontend", desc: "React, Vue, Angular" },
        { icon: Server, name: "Backend", desc: "Node.js, Python, Java" },
        { icon: Database, name: "Database", desc: "MySQL, MongoDB, PostgreSQL" },
        { icon: Smartphone, name: "Mobile", desc: "React Native, Flutter" }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-slate-900/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="mb-6">
                                <motion.span 
                                    className="inline-block px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    👋 Olá, eu sou
                                </motion.span>
                                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                    <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                                        Matheus
                                    </span>
                                    <br />
                                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                        Lucindo
                                    </span>
                                </h1>
                            </div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mb-8"
                            >
                                <h2 className="text-xl md:text-2xl text-slate-300 font-light mb-4">
                                    Desenvolvedor Full Stack
                                </h2>
                                <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                                    Especialista em criar experiências digitais excepcionais. 
                                    Transformo ideias complexas em soluções elegantes e funcionais 
                                    que geram impacto real para empresas e usuários.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link to={createPageUrl("Portfolio")}>
                                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                                        Ver Portfolio
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                                <Link to={createPageUrl("Contact")}>
                                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 rounded-lg font-medium transition-all duration-300">
                                        Entrar em Contato
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative w-full max-w-md mx-auto">
                                <div className="aspect-square bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl absolute inset-0 animate-pulse"></div>
                                <div className="relative aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
                                    <img 
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                                        alt="Matheus Lucindo" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Preview */}
            <section className="py-20 bg-gradient-to-b from-slate-900/50 to-transparent">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                            Especialidades
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Domínio completo do ecossistema de desenvolvimento moderno
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <skill.icon className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {skill.name}
                                    </h3>
                                    <p className="text-slate-400">
                                        {skill.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Vamos criar algo
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> incrível </span>
                            juntos?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            Estou sempre em busca de novos desafios e oportunidades para 
                            aplicar minha paixão por tecnologia em projetos inovadores.
                        </p>
                        <Link to={createPageUrl("Contact")}>
                            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-10 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                                Iniciar Conversa
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}