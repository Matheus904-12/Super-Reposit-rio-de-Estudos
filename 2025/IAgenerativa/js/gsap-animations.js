document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada da página de login
    if (document.querySelector('.login-page')) {
        const tl = gsap.timeline();
        
        tl.from('.logo-container', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.login-form', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5');
    }
    
v
    
    // Animação de entrada da página de redações
    if (document.querySelector('.redacoes-page')) {
        gsap.from('.filters', {
            duration: 0.8,
            y: -30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });
        
        gsap.from('.list-header', {
            duration: 0.8,
            x: -50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.7
        });
        
        gsap.from('.list-item', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: {
                each: 0.05,
                grid: 'auto',
                from: 'center'
            },
            ease: 'power3.out',
            delay: 0.9
        });
    }
    
    // Animação de entrada da página de análise
    if (document.querySelector('.analise-page')) {
        const tl = gsap.timeline();
        
        tl.from('.analise-header', {
            duration: 0.8,
            y: -50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.analise-section', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: {
                each: 0.15,
                grid: [1, 2],
                from: 'center'
            },
            ease: 'power3.out'
        }, '-=0.3');
    }
    
    // Animação de entrada da página de perfil
    if (document.querySelector('.perfil-page')) {
        const tl = gsap.timeline();
        
        tl.from('.perfil-header', {
            duration: 0.8,
            y: -30,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.perfil-card', {
            duration: 0.8,
            x: -30,
            opacity: 0,
            ease: 'back.out(1.7)'
        })
        .from('.perfil-stats', {
            duration: 0.8,
            x: 30,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.perfil-section', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.5');
    }
    
    // Animação para modais
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            gsap.from('.modal-content', {
                duration: 0.5,
                y: -50,
                opacity: 0,
                ease: 'back.out(1.7)'
            });
        });
    });
    
    // Animação para botões
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.2,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.2,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // Animação para cards com z-index ajustado
    document.querySelectorAll('.card, .stat-card').forEach((card, index) => {
        // Define um z-index crescente para empilhamento correto
        gsap.set(card, { zIndex: index + 1 });
        
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -5,
                zIndex: 1000, // Garante que o card em hover fique por cima
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                zIndex: index + 1, // Volta ao z-index original
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                ease: 'power2.out'
            });
        });
    });
    
    // Animação para o círculo de progresso da nota
    const scoreCircle = document.querySelector('.progress-fill');
    if (scoreCircle) {
        gsap.from(scoreCircle, {
            duration: 2,
            strokeDashoffset: 340,
            ease: 'elastic.out(1, 0.5)'
        });
    }
    
    // Animação para barras de competência com stagger melhorado
    const competenceBars = document.querySelectorAll('.competencia-fill');
    if (competenceBars.length > 0) {
        gsap.from(competenceBars, {
            duration: 1.5,
            width: '0%',
            stagger: {
                each: 0.2,
                from: 'start'
            },
            ease: 'power3.out'
        });
    }
    
    // Animação para gráficos com sequência melhorada
    const charts = document.querySelectorAll('canvas');
    if (charts.length > 0) {
        gsap.from(charts, {
            duration: 1,
            opacity: 0,
            y: 30,
            stagger: {
                each: 0.3,
                from: 'start'
            },
            ease: 'power3.out',
            delay: 1
        });
    }
    
    // Animação para itens de lista com stagger em grid
    const listItems = document.querySelectorAll('.list-item, .activity-item');
    if (listItems.length > 0) {
        gsap.from(listItems, {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: {
                each: 0.1,
                grid: 'auto',
                from: 'center'
            },
            ease: 'power3.out'
        });
    }
    
    // Efeito de onda ao clicar em botões
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            gsap.fromTo(ripple, 
                { scale: 0, opacity: 0.7 },
                { 
                    scale: 10, 
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    onComplete: () => ripple.remove()
                }
            );
        });
    });
    
    // Adiciona estilo para o efeito ripple
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: translate(-50%, -50%);
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});