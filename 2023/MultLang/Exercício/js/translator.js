const translations = {
    'pt-br': {
        'loginTitle': 'Entrar',
        'emailPlaceholder': 'Seu Email',
        'passwordPlaceholder': 'Sua Senha',
        'loginButton': 'Entrar',
        'forgotPassword': 'Esqueceu sua senha?',
        'notRegistered': 'Não é Cadastrado?',
        'registerTitle': 'Cadastre-se',
        'namePlaceholder': 'Seu Nome Completo',
        'registerButton': 'Cadastrar',
        'cancelButton': 'Cancelar',
        'backButton': 'Voltar',
    },
    'en': {
        'loginTitle': 'Login',
        'emailPlaceholder': 'Your Email',
        'passwordPlaceholder': 'Your Password',
        'loginButton': 'Login',
        'forgotPassword': 'Forgot your password?',
        'notRegistered': 'Not Registered?',
        'registerTitle': 'Register',
        'namePlaceholder': 'Your Full Name',
        'registerButton': 'Register',
        'cancelButton': 'Cancel',
        'backButton': 'Back',
    },
    'es': {
        'loginTitle': 'Iniciar sesión',
        'emailPlaceholder': 'Tu correo electrónico',
        'passwordPlaceholder': 'Tu contraseña',
        'loginButton': 'Iniciar sesión',
        'forgotPassword': '¿Olvidaste tu contraseña?',
        'notRegistered': '¿No estás registrado?',
        'registerTitle': 'Registrarse',
        'namePlaceholder': 'Tu nombre completo',
        'registerButton': 'Registrarse',
        'cancelButton': 'Cancelar',
        'backButton': 'Volver',
    }
};

function translate(id, lang) {
    const element = document.getElementById(id);
    if (element && translations[id] && translations[id][lang]) {
        element.innerText = translations[id][lang];
    }
}

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    // Adapte isso conforme necessário para outros elementos da página
    translate('loginTitle', lang);
    translate('emailPlaceholder', lang);
    translate('passwordPlaceholder', lang);
    translate('loginButton', lang);
    translate('forgotPassword', lang);
    translate('notRegistered', lang);
    translate('registerTitle', lang);
    translate('namePlaceholder', lang);
    translate('registerButton', lang);
    translate('cancelButton', lang);
    tra
}
