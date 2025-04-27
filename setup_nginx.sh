# Actualizar y configurar dependencias
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm nginx
sudo npm install -g @angular/cli


# Clonar el repositorio (si no se ha hecho previamente)
cd /home/ubuntu
git clone https://github.com/Traxcomgarza/avance_proyecto_devops.git
cd avance_proyecto_devops/app-f1-shop

# Instalar dependencias de Angular
npm install

# Compilar el proyecto Angular
ng build

# Configurar Nginx
echo "
server {
    listen 80;
    server_name 34.201.6.124;

    root /home/ubuntu/avance_proyecto_devops/app-f1-shop/dist/app-f1-shop/browser;

    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    error_page  404 /404.html;
    location = /40x.html {
        root /usr/share/nginx/html;
    }

    error_page  500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
" | sudo tee /etc/nginx/sites-available/angular_frontend

# Crear el enlace simbólico
sudo ln -s /etc/nginx/sites-available/angular_frontend /etc/nginx/sites-enabled/

# Verificar configuración y reiniciar Nginx
sudo nginx -t && sudo systemctl restart nginx

echo "Frontend configurado y corriendo en Nginx!"
