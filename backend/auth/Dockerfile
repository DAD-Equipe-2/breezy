FROM node:22.16.0-alpine

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json .

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY src .

# Exposition du port utilisé par l'API
EXPOSE 5000

# Démarrage de l'application
CMD ["npm", "start"]
