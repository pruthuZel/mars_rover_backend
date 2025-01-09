# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the application will run on
EXPOSE 8085

# Define the command to start the application
CMD ["node", "index.js"]