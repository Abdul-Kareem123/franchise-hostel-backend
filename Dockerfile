# First stage: Build
FROM node:alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install npm dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .



# Set execution permissions for node_modules/.bin/*
RUN chmod -R 755 /app/node_modules/.bin



# Second stage: Run
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app /app


# Set execution permissions for node_modules/.bin/*
RUN chmod -R 755 /app/node_modules/.bin

# Install PM2 globally
RUN npm install pm2 -g



# Environment variables for Node.js
ENV NODE_ENV=development
ENV PORT=5003
ENV MONGODB_URL=mongodb+srv://AdEarns:pixalive@pixalive-adearns.kmmuaxl.mongodb.net/Franch?retryWrites=true&w=majority

# Authentication credentials
ENV basicAuthUser=franchise
ENV basicAuthKey=DAF87DSFDSFDSA98FSADKJE324KJL32HFD7FDSFB24343J49DSF

# Expose the port
EXPOSE 5003

# Set the entrypoint
ENTRYPOINT ["pm2-runtime", "start", "npm", "--", "run", "dev"]

