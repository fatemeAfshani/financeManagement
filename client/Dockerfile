FROM node:16-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn build



# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

