import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Award, Coffee } from "lucide-react";

export default function About() {
    const experience = [
        {
            title: "Senior Full Stack Developer",
            company: "Tech Innovation Corp",
            period: "2022 - Presente",
            description: "Lidero o desenvolvimento de aplicações web complexas utilizando React, Node.js e AWS. Responsável por arquitetar soluções escaláveis e mentoring de desenvolvedores junior."
        },
        {
            title: "Full Stack Developer",
            company: "Digital Solutions Ltd",
            period: "2020 - 2022",
            description: "Desenvolvimento de sistemas corporativos e e-commerce. Trabalhei com Vue.js, Python/Django e PostgreSQL, contribuindo para aumento de 40% na performance das aplicações."
        },
        {
            title: "Frontend Developer",
            company: "Creative Studio",
            period: "2018 - 2020",
            description: "Especialização em interfaces modernas e responsivas. Implementei designs pixel-perfect e otimizações que melhoraram a experiência do usuário significativamente."
        }
    ];

    const skills = [
        { category: "Frontend", items: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS"] },
        { category: "Backend", items: ["Node.js", "Python", "Java", "Express", "Django"] },
        { category: "Database", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
        { category: "DevOps", items: ["AWS", "Docker", "CI/CD", "Kubernetes"] }
    ];

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
                        Sobre Mim
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Desenvolvedor apaixonado por tecnologia com mais de 6 anos de experiência 
                        criando soluções digitais que fazem a diferença no mundo real.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* About Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Minha Jornada</h2>
                            <div className="space-y-6">
                                <p className="text-slate-300 leading-relaxed">
                                    Comecei minha jornada em desenvolvimento em 2018, fascinado pela possibilidade 
                                    de transformar ideias em realidade através do código. Desde então, venho 
                                    construindo uma carreira sólida focada em excelência técnica e inovação.
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    Ao longo dos anos, tive a oportunidade de trabalhar com empresas de diferentes 
                                    portes, desde startups ágeis até corporações estabelecidas, sempre buscando 
                                    entregar soluções que não apenas funcionam, mas que realmente agregam valor.
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    Minha paixão está em criar experiências digitais excepcionais, combinando 
                                    design elegante com funcionalidade robusta. Acredito que a melhor tecnologia 
                                    é aquela que simplifica a vida das pessoas.
                                </p>
                            </div>
                        </div>

                        {/* Experience Timeline */}
                        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-8">Experiência Profissional</h2>
                            <div className="space-y-8">
                                {experience.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="relative pl-8 border-l-2 border-indigo-500/30"
                                    >
                                        <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-500 rounded-full"></div>
                                        <div className="pb-6">
                                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                                                <span className="text-indigo-400 font-medium">@ {exp.company}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 mb-3">
                                                <Calendar className="w-4 h-4" />
                                                <span>{exp.period}</span>
                                            </div>
                                            <p className="text-slate-300 leading-relaxed">{exp.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills & Info Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Personal Info */}
                        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Informações</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-300">
                                    <MapPin className="w-5 h-5 text-indigo-400" />
                                    <span>São Paulo, Brasil</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Award className="w-5 h-5 text-indigo-400" />
                                    <span>6+ anos de experiência</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Coffee className="w-5 h-5 text-indigo-400" />
                                    <span>+500 xícaras de café</span>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Habilidades Técnicas</h3>
                            <div className="space-y-6">
                                {skills.map((skillGroup, index) => (
                                    <div key={index}>
                                        <h4 className="text-indigo-400 font-semibold mb-3">{skillGroup.category}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.items.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full text-sm text-slate-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-colors duration-300"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fun Facts */}
                        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Curiosidades</h3>
                            <div className="space-y-3 text-slate-300">
                                <p className="text-sm">🎮 Gamer nas horas vagas</p>
                                <p className="text-sm">📚 Sempre estudando novas tecnologias</p>
                                <p className="text-sm">🏃‍♂️ Praticante de corrida</p>
                                <p className="text-sm">🎵 Ouve música enquanto programa</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}