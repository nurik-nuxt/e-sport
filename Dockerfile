# Use the official Node.js image as the base image
FROM node:20.5.1-alpine

# Set the max old space size for node
ARG MAX_OLD_SPACE_SIZE=4096
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

# Install required packages
RUN apk update && apk add --no-cache nano vim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install serve package globally
RUN npm install -g serve

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 5000

# Set the command to run the server
CMD ["serve", "-s", "dist"]
