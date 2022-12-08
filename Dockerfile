# Build environment
FROM node:alpine as build
ARG HOST
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN REACT_APP_API_HOST=${HOST} npm run build

# Production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
