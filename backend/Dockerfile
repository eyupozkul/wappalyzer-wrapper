FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build
RUN npm run build

# Run
CMD [ "npm", "run", "start" ]
