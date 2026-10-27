document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
    // Suavidade ao scrollar ao clicar na navbar
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    const animate = {
        icons: () => {
            if (!window.gsap) return;
            gsap.from('.icon-add svg', { scale: 0.7, opacity: 0, duration: 0.7, ease: 'back.out(2)', delay: 1.2 });
            gsap.from('.icon-arrow svg', { x: -20, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.2, delay: 1.3 });

            document.querySelectorAll('.notion-btn, .calendar-nav-btn').forEach(btn => {
                const icon = btn.querySelector('.icon-add, .icon-arrow');
                if (!icon) return;
                const animation = gsap.to(icon, { y: -5, scale: 1.1, duration: 0.4, ease: 'power2.out', paused: true });
                btn.addEventListener('mouseenter', () => animation.play());
                btn.addEventListener('mouseleave', () => animation.reverse());
            });
        },
        entry: () => {
            if (!window.gsap) return;
            const timeline = gsap.timeline({ delay: 0.2 });
            timeline.from('.notion-section', { opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power2.out' })
                   .from('.notion-h2, .notion-h3', { opacity: 0, y: -20, duration: 0.7, ease: 'power2.out' }, "-=0.6")
                   .from('.resumo-cards .card', { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power2.out' }, "-=0.5")
                   .from('.calendar-tags .tag-badge', { opacity: 0, scale: 0.8, stagger: 0.05, duration: 0.5, ease: 'back.out(1.7)' }, "-=0.4");
        },
        modal: (modalElement) => {
            if (!window.gsap) return;
            gsap.fromTo(modalElement, { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        },
        loading: (callback) => {
            const loadingScreen = document.getElementById('welcome-loading');
            if (!loadingScreen) return;
            if (window.gsap) {
                gsap.to(loadingScreen, { opacity: 0, duration: 0.8, delay: 1.5, onComplete: () => {
                    loadingScreen.classList.add('hidden');
                    if (callback) callback();
                }});
            } else {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    if (callback) callback();
                }, 2000);
            }
        },
        updateCards: (selector) => {
            if (!window.gsap) return;
            gsap.from(selector, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power2.out' });
        }
    };

    // State
    let gastos = [];

    // Substituir toda lógica localStorage por integração PHP
    function carregarGastos() {
        ajaxGasto('read', {}, (res) => {
            gastos = Array.isArray(res) ? res : [];
            updateTabela();
            renderCategoriaTags();
            renderCalendario();
        });
    }

    function salvarGasto(data, callback) {
        ajaxGasto('create', data, (res) => {
            if (res.success) {
                showCustomAlert('Gasto salvo!', 'success', 'check_circle');
                carregarGastos();
                if (callback) callback();
            } else {
                showCustomAlert('Erro ao salvar!', 'error', 'error');
            }
        });
    }

    function atualizarGasto(data, callback) {
        ajaxGasto('update', data, (res) => {
            if (res.success) {
                showCustomAlert('Gasto atualizado!', 'success', 'check_circle');
                carregarGastos();
                if (callback) callback();
            } else {
                showCustomAlert('Erro ao atualizar!', 'error', 'error');
            }
        });
    }

    function apagarGasto(id, callback) {
        ajaxGasto('delete', { id }, (res) => {
            if (res.success) {
                showCustomAlert('Gasto apagado!', 'success', 'check_circle');
                carregarGastos();
                if (callback) callback();
            } else {
                showCustomAlert('Erro ao apagar!', 'error', 'error');
            }
        });
    }

    // DOM Elements
    const elements = {
        btnAdicionar: document.getElementById('btn-adicionar'),
        modalForm: document.getElementById('modal-form'),
        btnCancelar: document.getElementById('btn-cancelar'),
        formGasto: document.getElementById('form-gasto'),
        tabelaBody: document.getElementById('tabela-body'),
        calendarDiv: document.getElementById('calendar'),
        calendarTags: document.getElementById('calendar-tags'),
        prevMesBtn: document.getElementById('prev-mes'),
        nextMesBtn: document.getElementById('next-mes'),
        calendarMesSpan: document.getElementById('calendar-mes'),
        gastosDiaCards: document.getElementById('gastos-dia-cards'),
        totalDividas: document.getElementById('total-dividas'),
        totalFaturas: document.getElementById('total-faturas'),
        totalPagamentos: document.getElementById('total-pagamentos'),
        themeBtn: document.getElementById('toggle-theme'),
        themeIcon: document.getElementById('theme-icon'),
    };

    // Functions
        // Alert personalizado
        function showCustomAlert(message, type = 'info', icon = 'info') {
            const alertDiv = document.getElementById('custom-alert');
            if (!alertDiv) return;
            alertDiv.innerHTML = `<span class="material-icons">${icon}</span> ${message}`;
            alertDiv.className = `custom-alert ${type}`;
            setTimeout(() => {
                alertDiv.classList.remove('hidden');
            }, 10);
            setTimeout(() => {
                alertDiv.classList.add('hidden');
            }, 2200);
        }
    const saveData = () => localStorage.setItem('gastos', JSON.stringify(gastos));

    const updateResumo = () => {
        const totais = gastos.reduce((acc, g) => {
            const valor = parseFloat(g.valor) || 0;
            acc.faturas += valor;
            if (g.status === 'pendente') acc.dividas += valor;
            if (g.status === 'pago') acc.pagamentos += valor;
            return acc;
        }, { dividas: 0, faturas: 0, pagamentos: 0 });

        elements.totalDividas.textContent = `R$ ${totais.dividas.toFixed(2)}`;
        elements.totalFaturas.textContent = `R$ ${totais.faturas.toFixed(2)}`;
        elements.totalPagamentos.textContent = `R$ ${totais.pagamentos.toFixed(2)}`;
    };

    // Atualizar updateTabela para usar gastos vindos do PHP
    const updateTabela = () => {
        elements.tabelaBody.innerHTML = '';
        const filteredGastos = gastos.filter(g => categoriaSelecionada === '' || g.categoria === categoriaSelecionada);

        if (filteredGastos.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 6;
            td.textContent = 'Nenhum gasto encontrado.';
            td.style.textAlign = 'center';
            tr.appendChild(td);
            elements.tabelaBody.appendChild(tr);
            return;
        }

        filteredGastos.forEach((gasto, idx) => {
            const tr = document.createElement('tr');
            tr.dataset.index = idx;
            tr.innerHTML = `
                <td>${gasto.nome}</td>
                <td>R$ ${parseFloat(gasto.valor).toFixed(2)}</td>
                <td>${new Date(gasto.vencimento).toLocaleDateString()}</td>
                <td class="status-${gasto.status}">${gasto.status}</td>
                <td><span class="categoria-badge">${gasto.categoria || ''}</span></td>
                <td class="actions" style="display: flex; gap: 8px; justify-content: center; align-items: center;">
                    <button class="edit-btn icon-btn" title="Editar">
                        <span class="material-icons" style="color:#4F8EF7;font-size:22px;">edit</span>
                    </button>
                    <button class="delete-btn icon-btn" title="Excluir">
                        <span class="material-icons" style="color:#F75F4F;font-size:22px;">delete</span>
                    </button>
                </td>
            `;
            elements.tabelaBody.appendChild(tr);
        });
        updateResumo();
    };

    // Atualizar handleFormSubmit para usar PHP
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(elements.formGasto);
        const data = Object.fromEntries(formData.entries());

        if (gastoEditIndex !== null && gastos[gastoEditIndex] && gastos[gastoEditIndex].id) {
            data.id = gastos[gastoEditIndex].id;
            atualizarGasto(data, closeModal);
        } else {
            salvarGasto(data, closeModal);
        }
    };

    const openModal = (gasto, index) => {
        gastoEditIndex = index;
        elements.formGasto.reset();
        if (gasto) {
            Object.entries(gasto).forEach(([key, value]) => {
                if (elements.formGasto[key]) elements.formGasto[key].value = value;
            });
        }
        elements.modalForm.classList.remove('hidden');
        animate.modal(elements.modalForm);
    };

    const closeModal = () => {
        elements.modalForm.classList.add('hidden');
        gastoEditIndex = null;
    };

    // Atualizar handleTableClick para apagar via PHP
    const handleTableClick = (e) => {
        let btn = e.target;
        if (btn.tagName === 'SPAN' && btn.classList.contains('material-icons')) {
            btn = btn.closest('button');
        }
        const tr = btn.closest('tr');
        if (!tr) return;
        const index = parseInt(tr.dataset.index, 10);
        if (isNaN(index) || !gastos[index]) return;

        if (btn.classList.contains('edit-btn')) {
            openModal(gastos[index], index);
        } else if (btn.classList.contains('delete-btn')) {
            if (btn.classList.contains('confirming')) return;
            btn.classList.add('confirming');
            showCustomAlert(`Clique novamente para confirmar exclusão de "${gastos[index].nome}"`, 'error', 'warning');
            btn.disabled = true;
            setTimeout(() => { btn.disabled = false; }, 2200);
            btn.addEventListener('click', function confirmar(e2) {
                btn.classList.remove('confirming');
                btn.removeEventListener('click', confirmar);
                const trAtual = btn.closest('tr');
                const idxAtual = trAtual ? parseInt(trAtual.dataset.index, 10) : index;
                if (!isNaN(idxAtual) && gastos[idxAtual] && gastos[idxAtual].id) {
                    apagarGasto(gastos[idxAtual].id);
                }
            }, { once: true });
        }
    };

    const renderCategoriaTags = () => {
        elements.calendarTags.innerHTML = '';
        const allTag = document.createElement('span');
        allTag.className = `tag-badge ${categoriaSelecionada === '' ? 'selected' : ''}`;
        allTag.textContent = 'Todas';
        allTag.addEventListener('click', () => {
            categoriaSelecionada = '';
            renderCategoriaTags();
            updateTabela();
            renderCalendario();
        });
        elements.calendarTags.appendChild(allTag);

        categorias.forEach(cat => {
            const tag = document.createElement('span');
            tag.className = `tag-badge ${categoriaSelecionada === cat ? 'selected' : ''}`;
            tag.textContent = cat;
            tag.addEventListener('click', () => {
                categoriaSelecionada = categoriaSelecionada === cat ? '' : cat;
                renderCategoriaTags();
                updateTabela();
                renderCalendario();
            });
            elements.calendarTags.appendChild(tag);
        });
    };

    const renderCalendario = () => {
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();
        elements.calendarMesSpan.textContent = `${dataAtual.toLocaleString('default', { month: 'long' })} ${ano}`;

        const primeiroDia = new Date(ano, mes, 1).getDay();
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        let html = '<div class="calendar-grid">';
        ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].forEach(dia => {
            html += `<div class="calendar-header">${dia}</div>`;
        });

        for (let i = 0; i < primeiroDia; i++) html += '<div class="other-month"></div>';

        for (let dia = 1; dia <= diasNoMes; dia++) {
            const data = new Date(ano, mes, dia);
            const dataStr = data.toISOString().slice(0, 10);
            const eventos = gastos.filter(g => g.vencimento === dataStr && (categoriaSelecionada === '' || g.categoria === categoriaSelecionada));
            const isToday = data.toDateString() === new Date().toDateString();
            html += `<div class="calendar-day ${isToday ? 'today' : ''} ${eventos.length > 0 ? 'event' : ''}" data-date="${dataStr}">${dia}</div>`;
        }
        html += '</div>';
        elements.calendarDiv.innerHTML = html;
    };

    const renderGastosDoDia = (dateStr) => {
        const gastosDia = gastos.filter(g => g.vencimento === dateStr && (categoriaSelecionada === '' || g.categoria === categoriaSelecionada));
        elements.gastosDiaCards.innerHTML = '';

        if (gastosDia.length === 0) {
            elements.gastosDiaCards.innerHTML = '<p class="no-gastos">Nenhum gasto para este dia.</p>';
            return;
        }

        gastosDia.forEach(g => {
            const card = document.createElement('div');
            card.className = 'gasto-dia-card';
            card.dataset.status = g.status;
            card.innerHTML = `
                <strong class="gasto-nome">${g.nome}</strong>
                <span class="gasto-valor">R$ ${parseFloat(g.valor).toFixed(2)}</span>
                <span class="gasto-categoria">${g.categoria}</span>
                <span class="gasto-status">${g.status}</span>
            `;
            elements.gastosDiaCards.appendChild(card);
        });
        animate.updateCards('.gasto-dia-card');
    };

    // Corrigir lógica do tema claro/escuro
    const setupTheme = () => {
        const setTheme = (isLight) => {
            document.body.classList.toggle('light', isLight);
            if (elements.themeIcon) {
                elements.themeIcon.textContent = isLight ? '🌞' : '🌙';
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        };
        if (elements.themeBtn) {
            elements.themeBtn.addEventListener('click', () => {
                const isLight = !document.body.classList.contains('light');
                setTheme(isLight);
            });
        }
        setTheme(localStorage.getItem('theme') === 'light');
    };

    // Função AJAX para CRUD com PHP
function ajaxGasto(action, data = {}, callback) {
    const formData = new FormData();
    formData.append('action', action);
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    fetch('../php/gastos_crud.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(callback)
    .catch(() => showCustomAlert('Erro de conexão com o servidor!', 'error', 'error'));
}

// Exemplo de uso para criar gasto
// ajaxGasto('create', { nome: 'Exemplo', valor: 10, vencimento: '2025-11-25', status: 'pendente', categoria: 'Teste', obs: 'Observação' }, (res) => {
//     if (res.success) showCustomAlert('Gasto salvo!', 'success', 'check_circle');
// });

// Exemplo de uso para ler gastos
// ajaxGasto('read', {}, (gastos) => {
//     console.log(gastos);
// });

// Exemplo de uso para atualizar gasto
// ajaxGasto('update', { id: 1, nome: 'Novo nome', valor: 20, vencimento: '2025-12-01', status: 'pago', categoria: 'Nova', obs: 'Alterado' }, (res) => {
//     if (res.success) showCustomAlert('Gasto atualizado!', 'success', 'check_circle');
// });

// Exemplo de uso para apagar gasto
// ajaxGasto('delete', { id: 1 }, (res) => {
//     if (res.success) showCustomAlert('Gasto apagado!', 'success', 'check_circle');
// });

    // Event Listeners
    elements.btnAdicionar.addEventListener('click', () => openModal(null, null));
    elements.btnCancelar.addEventListener('click', closeModal);
    elements.formGasto.addEventListener('submit', handleFormSubmit);
    elements.tabelaBody.addEventListener('click', handleTableClick);

    elements.prevMesBtn.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderCalendario();
    });
    elements.nextMesBtn.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderCalendario();
    });

    elements.calendarDiv.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('calendar-day') && target.dataset.date) {
            document.querySelectorAll('.calendar-day.selected').forEach(d => d.classList.remove('selected'));
            target.classList.add('selected');
            renderGastosDoDia(target.dataset.date);
        }
    });

    // Initial Load
    // Carregar gastos do PHP ao iniciar
    const init = () => {
        animate.loading(() => {
            animate.entry();
            animate.icons();
        });
        setupTheme();
        carregarGastos();
        // Select today by default
        const todayStr = new Date().toISOString().slice(0, 10);
        const todayEl = document.querySelector(`.calendar-day[data-date="${todayStr}"]`);
        if (todayEl) {
            todayEl.classList.add('selected');
            renderGastosDoDia(todayStr);
        }
        // Relógio ao vivo na navbar
        const clockEl = document.getElementById('navbar-clock');
        function updateClock() {
            const now = new Date();
            const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
            const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
            const diaSemana = dias[now.getDay()];
            const dia = String(now.getDate()).padStart(2, '0');
            const mes = meses[now.getMonth()];
            const ano = now.getFullYear();
            const hora = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            const seg = String(now.getSeconds()).padStart(2, '0');
            const dateStr = `${dia} de ${mes} de ${ano}`;
            const timeStr = `${hora}:${min}:${seg}`;
            if (clockEl) clockEl.textContent = `${dateStr} - ${diaSemana} - ${timeStr}`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    };

    init();
});