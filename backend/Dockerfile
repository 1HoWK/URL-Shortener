# Use the official Node.js image as a base image
FROM node:20-bullseye-slim

# Set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app is running on
EXPOSE 8000

# Command to start the app server
CMD ["node", "server.js"]