FROM node:25

WORKDIR /app

# Change ownership to the node user (already exists in the image)
RUN chown -R node:node /app

# Switch to non-root user
USER node

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]