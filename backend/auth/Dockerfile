# Base image
FROM node:24-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json .
RUN npm install

# Copy source files
COPY . .

# Start the app
CMD [ "npm", "start" ]