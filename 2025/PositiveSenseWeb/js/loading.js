/**
 * ========================================
 * LOADING SCREEN MANAGER
 * PositiveSense - Gerenciador de Carregamento
 * ========================================
 *
 * Controla fade in/out do loading screen
 * APENAS na navegação de páginas (não em ações AJAX)
 */

class LoadingScreenManager {
    constructor() {
        this.loadingScreen = null;
        this.initialized = false;
        this.hideDelay = 800; // Tempo mínimo em tela (reduzido)
        this.init();
    }

    /**
     * Inicializa o loading screen
     */
    init() {
        if (this.initialized) return;

        // Cria o elemento do loading screen
        this.createLoadingScreen();

        // Mostra loading APENAS no carregamento inicial da página
        if (document.readyState === 'loading') {
            this.showLoadingScreen();
        }

        // Esconde quando página termina de carregar
        window.addEventListener('load', () => {
            this.hideLoadingScreen();
        });

        // Backup: hide após um tempo máximo mesmo se não carregar
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 5000); // 5 segundos máximo

        // IMPORTANTE: Mostra loading APENAS ao clicar em LINKS de navegação
        // NÃO mostra em botões de formulário, AJAX, ou ações na mesma página
        this.setupNavigationListener();

        this.initialized = true;
    }

    /**
     * Configura listener APENAS para navegação entre páginas
     */
    setupNavigationListener() {
        document.addEventListener('click', (e) => {
            // Verifica se clicou em um link de navegação
            const link = e.target.closest('a');

            if (!link) return; // Não é um link

            const href = link.getAttribute('href');

            // Ignora links especiais
            if (!href ||
                href.startsWith('#') ||            // Âncoras na mesma página
                href.startsWith('javascript:') ||  // JavaScript
                href.includes('logout') ||         // Logout
                link.hasAttribute('download') ||   // Downloads
                link.target === '_blank'           // Abrir em nova aba
            ) {
                return;
            }

            // Se chegou aqui, é navegação real para outra página
            this.showLoadingScreen();
        }, true);
    }

    /**
     * Cria a estrutura do loading screen
     */
    createLoadingScreen() {
        if (document.getElementById('loading-screen')) {
            this.loadingScreen = document.getElementById('loading-screen');
            return;
        }

        const html = `
            <div id="loading-screen" class="hidden">
                <div class="loading-content">
                    <div class="loading-mascote">
                        <img src="img/teladecarregamento.gif?v=${Date.now()}" alt="Carregando PositiveSense" class="mascote-gif">
                    </div>

                    <div class="loading-text">
                        Carregando
                        <div class="loading-dots">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>

                    <div class="loading-subtext">
                        Preparando sua experiência inclusiva...
                    </div>

                    <div class="loading-progress-bar">
                        <div class="loading-progress-fill"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', html);
        this.loadingScreen = document.getElementById('loading-screen');
    }

    /**
     * Esconde o loading screen com fade out
     */
    hideLoadingScreen() {
        if (!this.loadingScreen) return;

        setTimeout(() => {
            this.loadingScreen.classList.add('fade-out');
            this.loadingScreen.classList.add('hidden');

            // Remove do DOM após a animação
            setTimeout(() => {
                if (this.loadingScreen && this.loadingScreen.parentNode) {
                    this.loadingScreen.style.display = 'none';
                }
            }, 800); // Tempo da animação fade-out
        }, this.hideDelay);
    }

    /**
     * Mostra novamente o loading screen (apenas navegação)
     */
    showLoadingScreen() {
        if (!this.loadingScreen) return;

        this.loadingScreen.style.display = 'flex';
        this.loadingScreen.classList.remove('fade-out');
        this.loadingScreen.classList.remove('hidden');
    }
}

// Inicializa automaticamente quando o script carrega
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.loadingScreenManager = new LoadingScreenManager();
    });
} else {
    window.loadingScreenManager = new LoadingScreenManager();
}
