"""
ASGI config for cptm_tracker project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cptm_tracker.settings')

# get_asgi_application() chama django.setup() e popula o app registry —
# precisa rodar antes de qualquer import que toque em models (routing ->
# consumers -> django.contrib.auth.models.User), senão dá
# AppRegistryNotReady. Com o runserver isso passava despercebido; com um
# servidor ASGI de verdade (Daphne) o import ocorre na ordem escrita aqui.
django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
import apps.routing

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                apps.routing.websocket_urlpatterns
            )
        )
    ),
})
