# Етап 1: Збірка Vite-проєкту
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

# Етап 2: Сервер через Nginx
FROM nginx:stable-alpine

# Копіюємо збілджений фронтенд
COPY --from=builder /app/dist /usr/share/nginx/html

# Прибираємо default.conf, щоб не було 404
RUN rm /etc/nginx/conf.d/default.conf

# Додаємо свій nginx конфіг
COPY nginx.conf /etc/nginx/conf.d/app.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
