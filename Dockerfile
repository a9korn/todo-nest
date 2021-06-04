FROM node:15-alpine AS build
# Set working directory
WORKDIR /usr/src/app
# Copy npm files
COPY package*.json ./
# Install dependency
RUN npm install --production
# Copy project files
COPY . .
# build project
RUN npm install typescript && \
    node --max-old-space-size=512 ./node_modules/typescript/bin/tsc -p ./tsconfig.build.json
#RUN npm run build
#RUN npm prune --production

FROM node:15-alpine
# Set working directory
WORKDIR /usr/src/app
# Copy project files, then copy build output files
COPY . .
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
# Setting project port and entrypoint
#EXPOSE 3005
#ENV SERVER_PORT=3005
CMD ["npm","run", "start:prod"]
