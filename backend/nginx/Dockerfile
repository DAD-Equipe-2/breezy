# Use official lightweight NGINX image
FROM nginx:alpine

# Set workdir
WORKDIR /etc/nginx

# Install openssl
RUN apk add --no-cache openssl

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy your entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Start NGINX via entrypoint
ENTRYPOINT ["/entrypoint.sh"]