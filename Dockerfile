# Build environment
FROM node:alpine as build
ARG HOST
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN yarn install -g --silent
RUN REACT_APP_API_HOST=${HOST} yarn run build

# Production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN sed -i 's/index  index.html index.htm;/try_files \$uri \/index.html;/' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
