// Adicione este código ao seu arquivo JavaScript ou em uma tag <script> no final da página
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar evento de clique para botões "Marcar como lida"
    const btnMarcarLida = document.querySelectorAll('.marcar-lida');
    
    btnMarcarLida.forEach(btn => {
        btn.addEventListener('click', function() {
            const notificacaoId = this.getAttribute('data-id');
            const notificacaoItem = this.closest('.notificacao-item');
            
            // Fazer requisição AJAX para marcar como lida
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'api/profile/marcar_notificacao_lida.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // Atualizar a interface
                    notificacaoItem.classList.remove('nao-lida');
                    notificacaoItem.classList.add('lida');
                    btn.remove();
                    
                    // Atualizar o texto do status
                    const statusSpan = notificacaoItem.querySelector('.status-nao-lida');
                    if (statusSpan) {
                        statusSpan.textContent = 'Lida';
                        statusSpan.classList.remove('status-nao-lida');
                        statusSpan.classList.add('status-lida');
                    }
                }
            };
            xhr.send('notificacao_id=' + notificacaoId);
        });
    });
});