# Exemplo de função para enviar notificações (pode ser expandido para push, email, etc)
def send_notification(message, user=None):
    # Aqui você pode integrar com serviços de push, email, SMS, etc.
    print(f'Notificação para {user if user else "todos"}: {message}')
