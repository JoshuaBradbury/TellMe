FROM nginx:1.13.9

RUN echo "deb http://ftp.debian.org/debian stretch-backports main" > /etc/apt/sources.list.d/certbot.list && \
    apt-get update && \
    apt-get install python-certbot-nginx -t stretch-backports -y && \
    rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY html /etc/nginx/html/
