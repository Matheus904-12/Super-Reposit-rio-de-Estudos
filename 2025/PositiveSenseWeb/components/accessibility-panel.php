<!--
========================================
PAINEL DE ACESSIBILIDADE
PositiveSense - Modo Inclusivo
========================================
Este componente é injetado no HTML via JavaScript
-->

<div id="accessibility-panel" role="region" aria-label="Painel de Acessibilidade">
    <div class="accessibility-panel-header">
        <h3>♿ Acessibilidade</h3>
        <button class="accessibility-panel-close"
            aria-label="Fechar painel de acessibilidade"
            onclick="document.getElementById('accessibility-panel').style.display='none'">
            ✕
        </button>
    </div>

    <!-- TAMANHO DA FONTE -->
    <div class="accessibility-panel-section">
        <div class="accessibility-section-title">Tamanho da Fonte</div>
        <div class="accessibility-slider">
            <button aria-label="Diminuir tamanho da fonte"
                style="color: #5B8FC4 !important; font-weight: 600;"
                onclick="window.accessibilityManager?.changeFontSize(-1)">
                <i class="fas fa-minus"></i> <span style="font-size: 14px;">A-</span>
            </button>
            <span id="accessibility-font-size">Fonte: 0</span>
            <button aria-label="Aumentar tamanho da fonte"
                style="color: #5B8FC4 !important; font-weight: 600;"
                onclick="window.accessibilityManager?.changeFontSize(1)">
                <i class="fas fa-plus"></i> <span style="font-size: 14px;">A+</span>
            </button>
        </div>
        <div class="accessibility-help-text">Use Alt+Mais/Menos no teclado</div>
    </div>

    <!-- MODO VISUAL -->
    <div class="accessibility-panel-section">
        <div class="accessibility-section-title">Modo Visual</div>
        <div class="accessibility-buttons">
            <button class="accessibility-btn"
                data-accessibility-btn="high-contrast"
                aria-label="Alto contraste"
                aria-pressed="false"
                onclick="window.accessibilityManager?.toggleHighContrast()">
                <i class="fas fa-adjust"></i>
                <span class="accessibility-btn-label">Alto Contraste</span>
            </button>

            <button class="accessibility-btn"
                data-accessibility-btn="dark-mode"
                aria-label="Modo escuro"
                aria-pressed="false"
                onclick="window.accessibilityManager?.toggleDarkMode()">
                <i class="fas fa-moon"></i>
                <span class="accessibility-btn-label">Escuro</span>
            </button>

            <button class="accessibility-btn"
                data-accessibility-btn="spacing"
                aria-label="Espaçamento aumentado"
                aria-pressed="false"
                onclick="window.accessibilityManager?.toggleSpacing()">
                <i class="fas fa-arrows-alt"></i>
                <span class="accessibility-btn-label">Espaço</span>
            </button>
        </div>
    </div>

    <!-- MOVIMENTO E ÁUDIO -->
    <div class="accessibility-panel-section">
        <div class="accessibility-section-title">Movimento & Áudio</div>
        <div class="accessibility-buttons">
            <button class="accessibility-btn"
                data-accessibility-btn="reduced-motion"
                aria-label="Movimento reduzido"
                aria-pressed="false"
                onclick="window.accessibilityManager?.toggleReducedMotion()">
                <i class="fas fa-ban"></i>
                <span class="accessibility-btn-label">Menos Movimento</span>
            </button>

            <button class="accessibility-btn"
                data-accessibility-btn="screen-reader"
                aria-label="Leitor de tela"
                aria-pressed="false"
                onclick="window.accessibilityManager?.toggleScreenReader()">
                <i class="fas fa-volume-up"></i>
                <span class="accessibility-btn-label">Leitor</span>
            </button>
        </div>
        <div class="accessibility-help-text">Alt+S: Leitor | VLibras em flutuante ao lado</div>
    </div>

    <!-- AÇÕES -->
    <div class="accessibility-panel-section">
        <button class="accessibility-reset-btn"
            aria-label="Resetar configurações de acessibilidade"
            onclick="window.accessibilityManager?.resetSettings()">
            <i class="fas fa-redo"></i> Resetar Tudo
        </button>
    </div>

    <!-- ATALHOS DE TECLADO -->
    <div class="accessibility-panel-section">
        <div class="accessibility-section-title">Atalhos de Teclado</div>
        <div class="accessibility-help-text">
            <strong>Alt + A:</strong> Abrir painel<br>
            <strong>Alt + +/-:</strong> Tamanho da fonte<br>
            <strong>Alt + C:</strong> Alto contraste<br>
            <strong>Alt + D:</strong> Modo escuro<br>
            <strong>Alt + S:</strong> Leitor de tela<br>
            <strong>Tab:</strong> Navegar por teclado
        </div>
    </div>
</div>

<!-- ARIA LIVE REGION para anúncios -->
<div id="accessibility-aria-live"
    role="status"
    aria-live="polite"
    aria-atomic="true"></div>

<script>
    // Injeta estilos se ainda não estiverem presentes
    if (!document.querySelector('link[href*="accessibility.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/tcc/css/accessibility.css';
        document.head.appendChild(link);
    }
</script>
