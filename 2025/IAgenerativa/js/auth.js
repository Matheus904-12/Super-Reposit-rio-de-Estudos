// Configuração do Firebase (substitua com suas credenciais)
const firebaseConfig = {
    apiKey: "REMOVIDA_CHAVE_API",
    authDomain: "enemapro-260d1.firebaseapp.com",
    projectId: "enemapro-260d1",
    storageBucket: "enemapro-260d1.firebasestorage.app",
    messagingSenderId: "1069849494281",
    appId: "1:1069849494281:web:daeba7abb6362c9293c9d8"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Verifica e aplica o tema salvo
function applySavedTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // Atualiza o toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle') || 
                          document.getElementById('toggle-dark-mode');
    
    if (darkModeToggle) {
        if (darkModeToggle.tagName === 'INPUT') {
            darkModeToggle.checked = isDarkMode;
        } else {
            const icon = darkModeToggle.querySelector('i');
            const text = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
            icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
            darkModeToggle.innerHTML = `<i class="${icon.className}"></i> ${text}`;
        }
    }
}

// Alterna entre modo claro e escuro
function toggleDarkMode() {
    const isDarkMode = !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
    
    // Atualiza o toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle') || 
                          document.getElementById('toggle-dark-mode');
    
    if (darkModeToggle) {
        if (darkModeToggle.tagName === 'INPUT') {
            darkModeToggle.checked = isDarkMode;
        } else {
            const icon = darkModeToggle.querySelector('i');
            const text = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
            icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
            darkModeToggle.innerHTML = `<i class="${icon.className}"></i> ${text}`;
        }
    }
}

// Login com Google
function setupGoogleLogin() {
    const googleLoginBtn = document.getElementById('googleLogin');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    const user = result.user;
                    
                    // Verifica se é um e-mail de professor
                    if (!user.email.endsWith('.edu') && !user.email.endsWith('.edu.br')) {
                        alert('Apenas e-mails institucionais de professores são permitidos.');
                        firebase.auth().signOut();
                        return;
                    }
                    
                    // Salva informações do professor
                    db.collection('professores').doc(user.uid).set({
                        nome: user.displayName,
                        email: user.email,
                        foto: user.photoURL,
                        ultimoLogin: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true });
                    
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    alert('Erro ao fazer login: ' + error.message);
                });
        });
    }
}

// Login com e-mail e senha
function setupEmailLogin() {
    const emailLoginForm = document.getElementById('emailLogin');
    if (emailLoginForm) {
        emailLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    alert('Erro ao fazer login: ' + error.message);
                });
        });
    }
}

// Registro de novo usuário
function setupRegistration() {
    const registerLink = document.getElementById('register');
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = prompt('Digite seu e-mail institucional:');
            
            if (email && (email.endsWith('.edu') || email.endsWith('.edu.br'))) {
                const password = prompt('Digite uma senha (mínimo 6 caracteres):');
                
                if (password && password.length >= 6) {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            const nome = prompt('Digite seu nome completo:');
                            
                            db.collection('professores').doc(user.uid).set({
                                nome: nome,
                                email: user.email,
                                ultimoLogin: firebase.firestore.FieldValue.serverTimestamp()
                            });
                            
                            alert('Conta criada com sucesso! Faça login para continuar.');
                        })
                        .catch((error) => {
                            alert('Erro ao criar conta: ' + error.message);
                        });
                } else {
                    alert('A senha deve ter pelo menos 6 caracteres.');
                }
            } else {
                alert('Apenas e-mails institucionais de professores são permitidos.');
            }
        });
    }
}

// Logout
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            firebase.auth().signOut()
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    alert('Erro ao sair: ' + error.message);
                });
        });
    }
}

// Monitora o estado de autenticação
auth.onAuthStateChanged((user) => {
    if (user) {
        // Atualiza a UI com informações do usuário
        const userNameElements = document.querySelectorAll('#user-name, #profile-name');
        const userAvatarElements = document.querySelectorAll('#user-avatar, #profile-avatar');
        const profileEmail = document.getElementById('profile-email');
        
        userNameElements.forEach(el => {
            if (el) el.textContent = user.displayName || user.email;
        });
        
        userAvatarElements.forEach(el => {
            if (el) el.src = user.photoURL || 'assets/images/default-avatar.jpg';
        });
        
        if (profileEmail) profileEmail.textContent = user.email;
        
        // Carrega informações adicionais do perfil
        if (window.location.pathname.includes('perfil.html')) {
            db.collection('professores').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        document.getElementById('profile-school').textContent = data.escola || 'Instituição não informada';
                        document.getElementById('profile-subjects-input').value = data.disciplinas || '';
                        
                        // Atualiza estatísticas
                        if (data.totalRedacoes) {
                            document.getElementById('stats-analyzed').textContent = data.totalRedacoes;
                        }
                        if (data.mediaNotas) {
                            document.getElementById('stats-average').textContent = Math.round(data.mediaNotas);
                        }
                        if (data.percentualIA) {
                            document.getElementById('stats-ia').textContent = `${Math.round(data.percentualIA)}%`;
                        }
                    }
                })
                .catch((error) => {
                    console.error('Erro ao carregar perfil:', error);
                });
        }
        
        // Redireciona para o dashboard se estiver na página de login
        if (window.location.pathname.includes('index.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        // Redireciona para a página de login se não estiver autenticado
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
    }
});

// Configura os event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Aplica o tema salvo
    applySavedTheme();
    
    // Configura o toggle do modo escuro
    const darkModeToggle = document.getElementById('dark-mode-toggle') || 
                         document.getElementById('toggle-dark-mode');
    
    if (darkModeToggle) {
        if (darkModeToggle.tagName === 'INPUT') {
            darkModeToggle.addEventListener('change', toggleDarkMode);
        } else {
            darkModeToggle.addEventListener('click', toggleDarkMode);
        }
    }
    
    // Configura autenticação
    setupGoogleLogin();
    setupEmailLogin();
    setupRegistration();
    setupLogout();
    
    // Configura edição de perfil
    const editProfileBtn = document.getElementById('edit-profile');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const inputs = document.querySelectorAll('#profile-form input');
            const formActions = document.getElementById('form-actions');
            
            inputs.forEach(input => {
                input.disabled = !input.disabled;
            });
            
            formActions.style.display = formActions.style.display === 'none' ? 'flex' : 'none';
        });
    }
    
    // Configura cancelar edição
    const cancelEditBtn = document.getElementById('cancel-edit');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const inputs = document.querySelectorAll('#profile-form input');
            const formActions = document.getElementById('form-actions');
            
            inputs.forEach(input => {
                input.disabled = true;
            });
            
            formActions.style.display = 'none';
        });
    }
    
    // Configura envio do formulário de perfil
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = firebase.auth().currentUser;
            if (!user) return;
            
            const escola = document.getElementById('profile-school-input').value;
            const disciplinas = document.getElementById('profile-subjects-input').value;
            
            db.collection('professores').doc(user.uid).update({
                escola: escola,
                disciplinas: disciplinas
            })
            .then(() => {
                alert('Perfil atualizado com sucesso!');
                document.getElementById('profile-school').textContent = escola || 'Instituição não informada';
                
                // Desabilita os inputs novamente
                const inputs = document.querySelectorAll('#profile-form input');
                const formActions = document.getElementById('form-actions');
                
                inputs.forEach(input => {
                    input.disabled = true;
                });
                
                formActions.style.display = 'none';
            })
            .catch((error) => {
                alert('Erro ao atualizar perfil: ' + error.message);
            });
        });
    }
    
    // Configura alteração de avatar
    const changeAvatar = document.getElementById('change-avatar');
    if (changeAvatar) {
        changeAvatar.addEventListener('click', () => {
            document.getElementById('avatar-modal').classList.add('active');
        });
    }
    
    // Configura modal de avatar
    const avatarModalClose = document.querySelector('#avatar-modal .modal-close');
    if (avatarModalClose) {
        avatarModalClose.addEventListener('click', () => {
            document.getElementById('avatar-modal').classList.remove('active');
        });
    }
    
    const avatarModalCancel = document.querySelector('#avatar-modal .btn-cancel');
    if (avatarModalCancel) {
        avatarModalCancel.addEventListener('click', () => {
            document.getElementById('avatar-modal').classList.remove('active');
        });
    }
    
    // Configura upload de avatar
    const avatarUpload = document.getElementById('avatar-upload');
    if (avatarUpload) {
        avatarUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const user = firebase.auth().currentUser;
            if (!user) return;
            
            const storageRef = firebase.storage().ref(`avatars/${user.uid}`);
            const uploadTask = storageRef.put(file);
            
            uploadTask.on('state_changed',
                null,
                (error) => {
                    alert('Erro ao enviar avatar: ' + error.message);
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then((downloadURL) => {
                            // Atualiza o avatar no Firebase Auth
                            return user.updateProfile({
                                photoURL: downloadURL
                            });
                        })
                        .then(() => {
                            // Atualiza o avatar no Firestore
                            return db.collection('professores').doc(user.uid).update({
                                foto: user.photoURL
                            });
                        })
                        .then(() => {
                            // Atualiza a imagem na página
                            document.querySelectorAll('#user-avatar, #profile-avatar').forEach(img => {
                                img.src = user.photoURL;
                            });
                            
                            document.getElementById('avatar-modal').classList.remove('active');
                            alert('Avatar atualizado com sucesso!');
                        })
                        .catch((error) => {
                            alert('Erro ao atualizar avatar: ' + error.message);
                        });
                }
            );
        });
    }
});