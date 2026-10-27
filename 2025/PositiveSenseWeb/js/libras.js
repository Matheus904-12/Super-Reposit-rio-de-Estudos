/**
 * ========================================
 * SISTEMA DE LIBRAS - VLibras (Governo)
 * PositiveSense - Tradução Oficial em Libras
 * ========================================
 */

class LibrasManager {
    constructor() {
        this.ativado = false;
        this.provider = 'vlibras'; // VLibras - Governo Federal
        // URL oficial da documentação: https://vlibras.gov.br/doc/widget/installation/webpageintegration.html
        this.scriptUrl = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        this.docsUrl = 'https://vlibras.gov.br/doc/widget/index.html';
        this.siteOfiicialUrl = 'https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/vlibras';

        this.inicializar();
    }

    /**
     * Inicializa o sistema VLibras
     */
    inicializar() {
        // Carrega a integração padrão do VLibras
        this.integrarVLibras();
        console.log('LibrasManager inicializado');
    }

    /**
     * Integra VLibras conforme documentação oficial
     * https://vlibras.gov.br/doc/widget/installation/webpageintegration.html
     */
    integrarVLibras() {
        // Cria container do VLibras se não existir
        if (!document.querySelector('[vw]')) {
            const container = document.createElement('div');
            container.setAttribute('vw', '');
            container.className = 'enabled';
            container.innerHTML = `
                <div vw-access-button class="active"></div>
                <div vw-plugin-wrapper>
                    <div class="vw-plugin-top-wrapper"></div>
                </div>
            `;
            document.body.appendChild(container);
        }

        // Carrega e inicializa o script oficial
        if (!document.querySelector(`script[src="${this.scriptUrl}"]`)) {
            const script = document.createElement('script');
            script.src = this.scriptUrl;
            script.async = true;
            script.onload = () => {
                console.log('✅ VLibras carregado com sucesso');
                // Inicializa conforme documentação
                if (window.VLibras) {
                    new window.VLibras.Widget('https://vlibras.gov.br/app');
                    console.log('✅ Widget VLibras ativado');
                }
            };
            script.onerror = () => {
                console.error('❌ Erro ao carregar VLibras');
            };
            document.body.appendChild(script);
        }
    }

    /**
     * Ativa o VLibras (método para ser chamado pelo botão flutuante)
     */
    ativarVLibras() {
        // Garante que a integração está completa
        this.integrarVLibras();

        // Se o widget já foi inicializado
        if (window.VLibras && window.VLibras.Widget) {
            this.ativado = true;
            console.log('✅ VLibras ativado e pronto para tradução em Libras');
            return true;
        }

        // Se ainda não carregou, aguarda o carregamento
        const verificarWidget = setInterval(() => {
            if (window.VLibras && window.VLibras.Widget) {
                clearInterval(verificarWidget);
                this.ativado = true;
                console.log('✅ VLibras ativado com sucesso');
            }
        }, 500);

        // Timeout após 8 segundos
        setTimeout(() => {
            clearInterval(verificarWidget);
        }, 8000);
    }

    /**
     * Ativa o VLibras (alias para compatibilidade)
     */
    ativar() {
        this.ativarVLibras();
    }

    /**
     * Desativa o VLibras
     */
    desativar() {
        this.ativado = false;
        console.log('VLibras desativado');
    }

    /**
     * Alterna o estado do VLibras
     */
    alternarVLibras() {
        if (this.ativado) {
            this.desativar();
        } else {
            this.ativarVLibras();
        }
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.librasManager = new LibrasManager();
    });
} else {
    window.librasManager = new LibrasManager();
}
