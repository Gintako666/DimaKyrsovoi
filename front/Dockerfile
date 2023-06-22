# Dockerfile

# Use node alpine as it's a small node image
FROM node:16-alpine

# Create the directory on the node image
# where our Next.js front will live
RUN mkdir -p /front/

# Set /front as the working directory
WORKDIR /front

# Copy package.json and package-lock.json
# to the /front working directory
COPY package*.json /front/

# Install dependencies in /front
RUN npm ci

# Copy the rest of our Next.js folder into /front
COPY . /front/

# Translations
# COPY --from=builder ./next.config.js ./next.config.js

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD npm run build && npm run start
