#!/bin/sh

if [ ! -f /etc/nginx/cert.pem ]; then
  echo "Generating self-signed cert..."
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/key.pem \
    -out /etc/nginx/cert.pem \
    -subj "/C=FR/ST=Occitanie/L=Toulouse/O=Breezy Inc./OU=DevOps/CN=localhost"
fi

nginx -g 'daemon off;'