import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            value: "contato@matheuslucindo.dev",
            description: "Resposta em até 24h"
        },
        {
            icon: Phone,
            title: "Telefone",
            value: "+55 (11) 99999-9999",
            description: "WhatsApp disponível"
        },
        {
            icon: MapPin,
            title: "Localização",
            value: "São Paulo, SP",
            description: "Disponível para remote"
        }
    ];

    const socialLinks = [
        { icon: Github, url: "https://github.com", label: "GitHub" },
        { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
        { icon: Instagram, url: "https://instagram.com", label: "Instagram" }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simular envio do formulário
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Reset form
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
        
        setIsSubmitting(false);
        alert("Mensagem enviada com sucesso! Retornarei o contato em breve.");
    };

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
                        Entre em Contato
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Estou sempre interessado em novos projetos e oportunidades. 
                        Vamos conversar sobre como posso ajudar a tornar sua ideia realidade.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-white">
                                    Envie uma Mensagem
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-slate-300 text-sm font-medium mb-2 block">
                                                Nome *
                                            </label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                required
                                                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500"
                                                placeholder="Seu nome completo"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-slate-300 text-sm font-medium mb-2 block">
                                                Email *
                                            </label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                required
                                                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500"
                                                placeholder="seu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">
                                            Assunto *
                                        </label>
                                        <Input
                                            value={formData.subject}
                                            onChange={(e) => handleInputChange("subject", e.target.value)}
                                            required
                                            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500"
                                            placeholder="Qual o motivo do seu contato?"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">
                                            Mensagem *
                                        </label>
                                        <Textarea
                                            value={formData.message}
                                            onChange={(e) => handleInputChange("message", e.target.value)}
                                            required
                                            rows={6}
                                            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500"
                                            placeholder="Conte-me sobre seu projeto ou dúvida..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Enviando...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Send className="w-5 h-5" />
                                                Enviar Mensagem
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Contact Information */}
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                    className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                            <info.icon className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-slate-300 font-medium mb-1">
                                                {info.value}
                                            </p>
                                            <p className="text-slate-400 text-sm">
                                                {info.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-4">
                                Conecte-se Comigo
                            </h3>
                            <p className="text-slate-300 mb-6">
                                Acompanhe meu trabalho e conecte-se nas redes sociais
                            </p>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-slate-700 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                                        title={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-slate-300 group-hover:text-white" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability Status */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <h3 className="text-lg font-semibold text-white">
                                    Disponível para Projetos
                                </h3>
                            </div>
                            <p className="text-slate-300 text-sm">
                                Atualmente aceito novos projetos freelance e oportunidades full-time. 
                                Vamos conversar sobre sua próxima grande ideia!
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}