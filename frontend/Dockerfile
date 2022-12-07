FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build
RUN npm run build

# TODO: Maybe add nginx instead of local web server?
# Run
CMD ["npm", "run", "preview"]