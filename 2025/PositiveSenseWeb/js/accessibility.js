/**
 * ========================================
 * SISTEMA DE ACESSIBILIDADE
 * PositiveSense - Modo Inclusivo
 * ========================================
 *
 * Funcionalidades:
 * - Aumentar/diminuir tamanho da fonte
 * - Modo alto contraste
 * - Leitor de tela integrado
 * - Navegação por teclado
 * - Tema escuro/claro
 * - Espaçamento aumentado
 */

class AccessibilityManager {
    constructor() {
        this.storagePrefix = 'accessibility_';
        this.fontSizeLevel = 0; // -2 a +4 (padrão 0)
        this.highContrastEnabled = false;
        this.darkModeEnabled = false;
        this.screenReaderEnabled = false;
        this.increaseSpacingEnabled = false;
        this.focusVisibleEnabled = true;
        this.reducedMotionEnabled = false;
        this.screenReaderSetup = false;

        this.init();
    }

    /**
     * Inicializa o sistema
     */
    init() {
        this.loadSettings();
        this.applySettings();
        this.addKeyboardShortcuts();
        this.improveSemantics();
        this.detectSystemPreferences();

        // Se leitor de tela estava ativado, reativar
        if (this.screenReaderEnabled) {
            this.setupScreenReaderListeners();
        }
    }

    /**
     * Carrega configurações salvas
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem(this.storagePrefix + 'settings');
            if (saved) {
                const settings = JSON.parse(saved);
                Object.assign(this, settings);
            }
        } catch (e) {
            console.error('Erro ao carregar configurações de acessibilidade:', e);
        }
    }

    /**
     * Salva configurações
     */
    saveSettings() {
        try {
            localStorage.setItem(this.storagePrefix + 'settings', JSON.stringify({
                fontSizeLevel: this.fontSizeLevel,
                highContrastEnabled: this.highContrastEnabled,
                darkModeEnabled: this.darkModeEnabled,
                screenReaderEnabled: this.screenReaderEnabled,
                increaseSpacingEnabled: this.increaseSpacingEnabled,
                focusVisibleEnabled: this.focusVisibleEnabled,
                reducedMotionEnabled: this.reducedMotionEnabled
            }));
        } catch (e) {
            console.error('Erro ao salvar configurações:', e);
        }
    }

    /**
     * Detecta preferências do sistema
     */
    detectSystemPreferences() {
        // Nota: Não aplicamos automaticamente o tema escuro do sistema
        // O site sempre inicia em modo claro (normal)
        // O usuário pode ativar o modo escuro manualmente no painel de acessibilidade

        // Movimento reduzido preferido - ESTE SIM aplicamos
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.reducedMotionEnabled = true;
        }

        this.applySettings();
    }

    /**
     * Aplica todas as configurações
     */
    applySettings() {
        this.applyFontSize();
        this.applyHighContrast();
        this.applyDarkMode();
        this.applySpacing();
        this.applyReducedMotion();
        this.updatePanel();
    }

    /**
     * Aumenta/diminui tamanho da fonte
     * Níveis: -2 (muito pequeno) a +4 (muito grande)
     */
    changeFontSize(delta) {
        this.fontSizeLevel = Math.max(-2, Math.min(4, this.fontSizeLevel + delta));
        this.applyFontSize();
        this.announce(`Tamanho da fonte ${this.fontSizeLevel > 0 ? 'aumentado' : this.fontSizeLevel < 0 ? 'diminuído' : 'padrão'}`);
        this.saveSettings();
    }

    /**
     * Aplica tamanho da fonte
     */
    applyFontSize() {
        // Multipliers: -2 = 75%, -1 = 85%, 0 = 100%, +1 = 115%, +2 = 130%, +3 = 150%, +4 = 175%
        const multipliers = {
            '-2': 0.75,
            '-1': 0.85,
            '0': 1,
            '1': 1.15,
            '2': 1.3,
            '3': 1.5,
            '4': 1.75
        };

        const multiplier = multipliers[this.fontSizeLevel.toString()] || 1;

        // Cria ou atualiza style tag para font size
        let styleEl = document.getElementById('accessibility-font-size-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'accessibility-font-size-style';
            document.head.appendChild(styleEl);
        }

        // Aplica com CSS custom property
        styleEl.textContent = `
            html {
                font-size: ${16 * multiplier}px !important;
            }
            body {
                font-size: ${16 * multiplier}px !important;
            }
            h1 { font-size: ${32 * multiplier}px !important; }
            h2 { font-size: ${28 * multiplier}px !important; }
            h3 { font-size: ${24 * multiplier}px !important; }
            h4 { font-size: ${20 * multiplier}px !important; }
            h5 { font-size: ${18 * multiplier}px !important; }
            h6 { font-size: ${16 * multiplier}px !important; }
            p { font-size: ${16 * multiplier}px !important; }
            button, .btn, input, select, textarea { font-size: ${14 * multiplier}px !important; }
        `;
    }

    /**
     * Alterna modo alto contraste
     */
    toggleHighContrast() {
        this.highContrastEnabled = !this.highContrastEnabled;
        this.applyHighContrast();
        this.announce(this.highContrastEnabled ? 'Alto contraste ativado' : 'Alto contraste desativado');
        this.saveSettings();
    }

    /**
     * Aplica modo alto contraste
     */
    applyHighContrast() {
        const html = document.documentElement;
        if (this.highContrastEnabled) {
            html.setAttribute('data-high-contrast', 'true');
        } else {
            html.removeAttribute('data-high-contrast');
        }
    }

    /**
     * Alterna modo escuro
     */
    toggleDarkMode() {
        this.darkModeEnabled = !this.darkModeEnabled;
        this.applyDarkMode();
        this.announce(this.darkModeEnabled ? 'Modo escuro ativado' : 'Modo escuro desativado');
        this.saveSettings();
    }

    /**
     * Aplica modo escuro
     */
    applyDarkMode() {
        const html = document.documentElement;
        if (this.darkModeEnabled) {
            html.setAttribute('data-dark-mode', 'true');
        } else {
            html.removeAttribute('data-dark-mode');
        }
    }

    /**
     * Alterna espaçamento aumentado
     */
    toggleSpacing() {
        this.increaseSpacingEnabled = !this.increaseSpacingEnabled;
        this.applySpacing();
        this.announce(this.increaseSpacingEnabled ? 'Espaçamento aumentado' : 'Espaçamento normal');
        this.saveSettings();
    }

    /**
     * Aplica espaçamento aumentado
     * DESABILITADO - Causa problemas de layout
     */
    applySpacing() {
        const html = document.documentElement;
        if (this.increaseSpacingEnabled) {
            html.setAttribute('data-increased-spacing', 'true');
        } else {
            html.removeAttribute('data-increased-spacing');
            // Remove estilo dinâmico se existir
            const style = document.getElementById('accessibility-spacing-style');
            if (style) style.remove();
        }
    }

    /**
     * Alterna movimento reduzido
     */
    toggleReducedMotion() {
        this.reducedMotionEnabled = !this.reducedMotionEnabled;
        this.applyReducedMotion();
        this.announce(this.reducedMotionEnabled ? 'Movimento reduzido' : 'Movimento normal');
        this.saveSettings();
    }

    /**
     * Aplica movimento reduzido
     */
    applyReducedMotion() {
        const html = document.documentElement;
        if (this.reducedMotionEnabled) {
            html.setAttribute('data-reduced-motion', 'true');
        } else {
            html.removeAttribute('data-reduced-motion');
        }
    }

    /**
     * Ativa/desativa leitor de tela
     */
    toggleScreenReader() {
        this.screenReaderEnabled = !this.screenReaderEnabled;
        this.announce(this.screenReaderEnabled ? 'Leitor de tela ativado' : 'Leitor de tela desativado');
        this.saveSettings();

        if (this.screenReaderEnabled) {
            this.setupScreenReaderListeners();
        } else {
            this.removeScreenReaderListeners();
        }
    }

    /**
     * Configura listeners para leitor de tela interativo
     */
    setupScreenReaderListeners() {
        if (this.screenReaderSetup) return;
        this.screenReaderSetup = true;

        // Criar estilo para destaque
        if (!document.getElementById('accessibility-highlight-style')) {
            const style = document.createElement('style');
            style.id = 'accessibility-highlight-style';
            style.textContent = `
                .accessibility-highlight {
                    background: rgba(168, 85, 247, 0.3) !important;
                    border-radius: 8px !important;
                    padding: 0.25rem 0.5rem !important;
                    transition: all 0.1s ease !important;
                    box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.6) !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Listener para mouse hover
        document.addEventListener('mouseover', (e) => {
            if (!this.screenReaderEnabled) return;

            const text = e.target.textContent?.trim();
            if (text && text.length > 0 && text.length < 200) {
                this.lerComDestaque(e.target);
            }
        }, true);

        // Listener para toque (mobile)
        document.addEventListener('touchstart', (e) => {
            if (!this.screenReaderEnabled) return;

            const element = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            );

            const text = element?.textContent?.trim();
            if (text && text.length > 0 && text.length < 200) {
                this.lerComDestaque(element);
            }
        }, true);
    }

    /**
     * Remove listeners do leitor de tela
     */
    removeScreenReaderListeners() {
        this.screenReaderSetup = false;
        // Os listeners permanecerão, mas não executarão se screenReaderEnabled for false
    }

    /**
     * Lê texto com destaque visual
     */
    lerComDestaque(element) {
        if (!this.screenReaderEnabled) return;

        const text = element.textContent?.trim();
        if (!text || text.length === 0 || text.length > 200) return;

        // Remove destaque anterior
        document.querySelectorAll('.accessibility-highlight').forEach(el => {
            el.classList.remove('accessibility-highlight');
        });

        // Adiciona destaque ao elemento
        element.classList.add('accessibility-highlight');

        // Lê o texto
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 1;

            // Evento quando termina de falar
            utterance.addEventListener('end', () => {
                element.classList.remove('accessibility-highlight');
            });

            // Evento quando inicia falar
            utterance.addEventListener('start', () => {
                element.classList.add('accessibility-highlight');
            });

            speechSynthesis.speak(utterance);
        }
    }

    /**
     * Anuncia mensagem para leitor de tela
     */
    announce(message) {
        const ariaLive = document.getElementById('accessibility-aria-live');
        if (ariaLive) {
            ariaLive.textContent = message;
        }

        // Também usa Web Speech API se disponível
        if ('speechSynthesis' in window && this.screenReaderEnabled) {
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = 'pt-BR';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            speechSynthesis.speak(utterance);
        }
    }

    /**
     * Adiciona atalhos de teclado
     */
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + Mais: Aumenta fonte
            if (e.altKey && (e.key === '+' || e.key === '=')) {
                e.preventDefault();
                this.changeFontSize(1);
            }

            // Alt + Menos: Diminui fonte
            if (e.altKey && e.key === '-') {
                e.preventDefault();
                this.changeFontSize(-1);
            }

            // Alt + S: Leitor de tela
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                this.toggleScreenReader();
            }

            // Alt + C: Alto contraste
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                this.toggleHighContrast();
            }

            // Alt + D: Modo escuro
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                this.toggleDarkMode();
            }
        });
    }

    /**
     * Melhora semântica HTML
     */
    improveSemantics() {
        // Adiciona role="main" ao conteúdo principal
        const main = document.querySelector('main') || document.querySelector('[role="main"]');
        if (!main) {
            const content = document.querySelector('body > section, body > article');
            if (content) content.setAttribute('role', 'main');
        }

        // Adiciona role="navigation" ao header/nav
        const nav = document.querySelector('nav') || document.querySelector('header');
        if (nav && !nav.hasAttribute('role')) {
            nav.setAttribute('role', 'navigation');
        }

        // Adiciona alt text em imagens sem
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.setAttribute('alt', 'Imagem');
        });

        // Melhora links vazios
        document.querySelectorAll('a:not([aria-label]):not([title])').forEach(link => {
            if (!link.textContent.trim()) {
                link.setAttribute('aria-label', 'Link');
            }
        });

        // Adiciona skip link
        this.addSkipLink();
    }

    /**
     * Adiciona skip link (pular para conteúdo)
     */
    addSkipLink() {
        if (document.querySelector('[data-skip-link]')) return;

        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Pular para conteúdo principal';
        skipLink.setAttribute('data-skip-link', 'true');
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary, #5B8FC4);
            color: white;
            padding: 8px;
            z-index: 100000;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Alterna painel de acessibilidade
     */
    toggleAccessibilityPanel() {
        let panel = document.getElementById('accessibility-panel');
        if (panel) {
            // O painel já inicia visível, este método apenas o deixa flexível
            if (panel.style.display === 'none') {
                panel.style.display = 'block';
            } else {
                panel.style.display = 'none';
            }
        }
    }

    /**
     * Atualiza botões do painel
     */
    updatePanel() {
        // Atualiza estados dos botões
        document.querySelectorAll('[data-accessibility-btn]').forEach(btn => {
            const action = btn.getAttribute('data-accessibility-btn');

            switch (action) {
                case 'high-contrast':
                    btn.classList.toggle('active', this.highContrastEnabled);
                    break;
                case 'dark-mode':
                    btn.classList.toggle('active', this.darkModeEnabled);
                    break;
                case 'screen-reader':
                    btn.classList.toggle('active', this.screenReaderEnabled);
                    break;
                case 'spacing':
                    btn.classList.toggle('active', this.increaseSpacingEnabled);
                    break;
                case 'reduced-motion':
                    btn.classList.toggle('active', this.reducedMotionEnabled);
                    break;
            }
        });

        // Atualiza display de tamanho da fonte
        const fontSizeDisplay = document.getElementById('accessibility-font-size');
        if (fontSizeDisplay) {
            fontSizeDisplay.textContent = `Fonte: ${this.fontSizeLevel > 0 ? '+' : ''}${this.fontSizeLevel}`;
        }
    }

    /**
     * Reseta todas as configurações
     */
    resetSettings() {
        this.fontSizeLevel = 0;
        this.highContrastEnabled = false;
        this.darkModeEnabled = false;
        this.screenReaderEnabled = false;
        this.increaseSpacingEnabled = false;
        this.reducedMotionEnabled = false;

        this.applySettings();
        this.announce('Configurações de acessibilidade resetadas');
        this.saveSettings();
    }

    /**
     * Cria botão flutuante para abrir/fechar o painel
     */
    createAccessibilityButton() {
        // Remove botão antigo se existir
        const oldBtn = document.getElementById('accessibility-open-btn');
        if (oldBtn) oldBtn.remove();

        // Cria novo botão
        const btn = document.createElement('button');
        btn.id = 'accessibility-open-btn';
        btn.setAttribute('aria-label', 'Abrir/Fechar painel de acessibilidade');
        btn.setAttribute('title', 'Acessibilidade');
        btn.innerHTML = '<i class="fas fa-universal-access"></i>';
        btn.style.cssText = `
            position: fixed !important;
            bottom: 300px !important;
            right: 10px !important;
            width: 40px !important;
            height: 40px !important;
            border-radius: 8px;
            background: linear-gradient(135deg, #5B8FC4 0%, #4A7BA7 100%);
            color: white;
            border: none;
            cursor: pointer;
            z-index: 9998;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(91, 143, 196, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Hover effects
        btn.addEventListener('mouseover', () => {
            btn.style.transform = 'scale(1.1)';
            btn.style.boxShadow = '0 6px 20px rgba(91, 143, 196, 0.6)';
        });

        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = '0 4px 12px rgba(91, 143, 196, 0.4)';
        });

        // Click para abrir/fechar painel
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleAccessibilityPanel();
        });

        document.body.appendChild(btn);
    }
}

// Inicializa quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.accessibilityManager = new AccessibilityManager();
        // Cria botão flutuante
        if (window.accessibilityManager) {
            window.accessibilityManager.createAccessibilityButton();
        }
    });
} else {
    window.accessibilityManager = new AccessibilityManager();
    // Cria botão flutuante
    if (window.accessibilityManager) {
        window.accessibilityManager.createAccessibilityButton();
    }
}

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}
