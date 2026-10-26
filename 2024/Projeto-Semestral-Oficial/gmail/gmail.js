// GMAIL E EMAIL

function enviarEmail() {
    // Dados do e-mail
    const emailDestinatario = "contato@restaurantearabe.com"; // Email empresarial
    const assunto = "Pedido de reserva no Restaurante Árabe";
    const mensagem = 
        "Olá, gostaria de fazer uma reserva no Restaurante Árabe. Por favor, entre em contato para mais detalhes.";
    
    // Construção do link mailto
    const mailtoLink = `mailto:${emailDestinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(mensagem)}`;
    
    // Abrir Gmail
    window.location.href = mailtoLink;
}