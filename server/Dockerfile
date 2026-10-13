# Stage 1: Runtime
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Create uploads directory
RUN mkdir -p uploads

# Expose API port
EXPOSE 5000

# Set production environment
ENV NODE_ENV=production

# Run server
CMD ["node", "src/server.js"]
