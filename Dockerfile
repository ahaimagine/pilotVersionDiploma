# 1. Етап: Збірка Vite-проєкту
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

# 2. Етап: Запуск зібраного застосунку через "serve"
FROM node:20-alpine

# Встановлюємо "serve" для обслуговування статичних файлів
RUN npm install -g serve

# Копіюємо зібраний застосунок
WORKDIR /app
COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
