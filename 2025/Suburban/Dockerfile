# Dockerfile pro deploy do Suburban (cptm tracker) no Fly.io
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY App/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir daphne

COPY App/ .

ENV DJANGO_SETTINGS_MODULE=cptm_tracker.settings
ENV PYTHONUNBUFFERED=1

RUN python manage.py collectstatic --noinput

EXPOSE 8080

CMD ["sh", "-c", "python manage.py migrate && daphne -b 0.0.0.0 -p 8080 cptm_tracker.asgi:application"]
