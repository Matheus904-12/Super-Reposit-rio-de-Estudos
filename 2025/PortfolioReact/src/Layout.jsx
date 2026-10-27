import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, User, Briefcase, Mail, Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Layout({ children, currentPageName }) {
    const location = useLocation();
    
    const navigationItems = [
        { name: "Home", path: createPageUrl("Home"), icon: Home },
        { name: "Sobre", path: createPageUrl("About"), icon: User },
        { name: "Portfolio", path: createPageUrl("Portfolio"), icon: Briefcase },
        { name: "Contato", path: createPageUrl("Contact"), icon: Mail }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
            {/* Navigation Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <nav className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to={createPageUrl("Home")} className="group">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <span className="font-bold text-white text-lg">ML</span>
                                </div>
                                <div className="hidden md:block">
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                        Matheus Lucindo
                                    </h1>
                                    <p className="text-sm text-slate-400">Full Stack Developer</p>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                                        location.pathname === item.path
                                            ? "bg-indigo-500/20 text-indigo-300 shadow-lg"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 text-slate-300 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden mt-4 pt-4 border-t border-slate-800">
                        <div className="grid grid-cols-2 gap-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`p-3 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                                        location.pathname === item.path
                                            ? "bg-indigo-500/20 text-indigo-300"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="pt-20">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800/50 mt-20">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                Matheus Lucindo
                            </h3>
                            <p className="text-slate-400">
                                Transformando ideias em soluções digitais excepcionais
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-800 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-800 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-800 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-slate-400">
                        <p>&copy; 2024 Matheus Lucindo. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}