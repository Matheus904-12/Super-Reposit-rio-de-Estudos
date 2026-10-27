import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
// import { Badge } from "@/components/ui/badge"; // Removed

export default function ProjectCard({ project, index, onSelect }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => onSelect(project)}
        >
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 relative overflow-hidden">
                    {project.image_url ? (
                        <img 
                            src={project.image_url} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-slate-400 text-4xl font-bold opacity-50">
                                {project.title.charAt(0)}
                            </div>
                        </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                            {project.title}
                        </h3>
                        {project.featured && (
                            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-2 py-1 rounded-md"> {/* Replaced Badge with span */}
                                Destaque
                            </span>
                        )}
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="px-2 py-1 bg-slate-700/50 border border-slate-600 rounded text-xs text-slate-300"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.technologies.length > 3 && (
                                <span className="px-2 py-1 text-xs text-slate-400">
                                    +{project.technologies.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-400 hover:bg-indigo-500/30 transition-colors duration-300 text-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Demo
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors duration-300 text-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="w-4 h-4" />
                                Código
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}