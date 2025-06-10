# 1. Етап: Збірка Vite-проєкту
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

# 2. Етап: Сервер через Nginx
FROM nginx:alpine

# Копіюємо збілджений фронтенд
COPY --from=builder /app/dist /usr/share/nginx/html

# Копіюємо кастомний Nginx конфіг, якщо потрібно (опціонально)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
