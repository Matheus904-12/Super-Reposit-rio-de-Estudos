import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectModal({ project, isOpen, onClose }) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                                <div className="flex items-center gap-4 text-sm text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Tag className="w-4 h-4" />
                                        <span className="capitalize">{project.category}</span>
                                    </div>
                                    {project.featured && (
                                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                                            Projeto Destaque
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </Button>
                        </div>

                        <div className="p-6">
                            {/* Project Image */}
                            {project.image_url && (
                                <div className="aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl mb-8 overflow-hidden">
                                    <img 
                                        src={project.image_url} 
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-4">Sobre o Projeto</h3>
                                <p className="text-slate-300 leading-relaxed">{project.description}</p>
                            </div>

                            {/* Technologies */}
                            {project.technologies && project.technologies.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-white mb-4">Tecnologias Utilizadas</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-colors duration-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {project.demo_url && (
                                    <a
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        Ver Demo Online
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-600 transition-colors duration-300"
                                    >
                                        <Github className="w-5 h-5" />
                                        Ver Código Fonte
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}