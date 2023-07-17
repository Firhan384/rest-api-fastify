# Pilih base image yang berisi Node.js
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode sumber aplikasi ke direktori kerja
COPY . .

# Build aplikasi TypeScript menjadi JavaScript
RUN npm run build:prod

# Expose port yang akan digunakan oleh aplikasi
EXPOSE 3000

# Perintah yang akan dijalankan ketika container dijalankan
CMD ["node", "dist/index.js"]