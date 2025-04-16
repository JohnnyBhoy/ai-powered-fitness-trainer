# Project description
    GoPeakFit - Workout ai advisor and trainer to help you become fit and healthy with the rigid 
    strict support with daily reminders and suggestions to help you become healthier and keep you in shape
    
# Step to run GoPeakFit in your local
    1. Download Composer for Php package dependencies
        For Windows:
            https://getcomposer.org/download

    2. Download npm (node package manager) for Javascript package and dependencies
        Visit Site
            https://nodejs.org/en/download

    3. Download VS Code for IDE (Development Environment)
        Download site
            https://code.visualstudio.com/download

    4. Clone this project repo

    5. Open the project in your local machine
        For Frontend
            "npm run dev"
        For Backend
            "php artisan serve"

# Techonology used for this project
    a. Laravel Breeze for authentication
    b. Typescript for strict typing
    c. Vite for auto refresh development like hot reload
    d. Intertia for SPA and SSR (server side rendering)
    e. Tailwind for css styling

# Note: 
    This is a SPA (Single Page Application) so no need to seperate the folder
    of the backend and front end


# Step-by-step setup script to initialize GoPeakFit SPA project with Docker

# 1. Install Laravel Breeze with React + TypeScript
composer require laravel/breeze --dev
php artisan breeze:install react --typescript
npm install && npm run dev
php artisan migrate

# 2. Add Dockerfile and docker-compose.yml
mkdir -p docker/nginx/conf.d

cat > Dockerfile <<EOL
FROM php:8.3-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    git curl zip unzip libonig-dev libxml2-dev libzip-dev libpng-dev \
    && docker-php-ext-install pdo pdo_mysql zip mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

COPY . .

RUN composer install
RUN npm install
RUN npm run build

CMD ["php-fpm"]
EOL

cat > docker-compose.yml <<EOL
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: gopeakfit-app
    container_name: gopeakfit-app
    restart: unless-stopped
    working_dir: /var/www
    volumes:
      - .:/var/www
    networks:
      - gopeakfit
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    container_name: gopeakfit-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: gopeakfit
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - dbdata:/var/lib/mysql
    networks:
      - gopeakfit

  nginx:
    image: nginx:alpine
    container_name: gopeakfit-nginx
    restart: unless-stopped
    ports:
      - "8000:80"
    volumes:
      - .:/var/www
      - ./docker/nginx/conf.d:/etc/nginx/conf.d
    depends_on:
      - app
    networks:
      - gopeakfit

volumes:
  dbdata:

networks:
  gopeakfit:
EOL

cat > docker/nginx/conf.d/default.conf <<EOL
server {
    listen 80;
    index index.php index.html;
    server_name localhost;
    root /var/www/public;

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT \$realpath_root;
    }

    location ~ /\.ht {
        deny all;
    }
}
EOL

# 3. Update .env DB credentials for Docker
sed -i '' 's/DB_HOST=.*/DB_HOST=mysql/' .env
sed -i '' 's/DB_PORT=.*/DB_PORT=3306/' .env
sed -i '' 's/DB_DATABASE=.*/DB_DATABASE=gopeakfit/' .env
sed -i '' 's/DB_USERNAME=.*/DB_USERNAME=user/' .env
sed -i '' 's/DB_PASSWORD=.*/DB_PASSWORD=password/' .env

# 4. GitHub .gitignore & init
curl -o .gitignore https://raw.githubusercontent.com/github/gitignore/main/Laravel.gitignore
git add .
git commit -m "Initial commit: Laravel + Inertia + React + TypeScript + Docker"

echo "✅ GoPeakFit SPA initialized. Use 'docker-compose up -d --build' to start it."
