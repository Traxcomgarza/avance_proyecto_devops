

# Definir variables
REPO_URL="https://github.com/Traxcomgarza/avance_proyecto_devops.git"
REPO_DIR="/home/ubuntu/avance_proyecto_devops"
BACKEND_DIR="$REPO_DIR/backend"

# Clonación o actualización del repositorio
echo "Verificando si el repositorio existe..."
if [ ! -d "$REPO_DIR" ]; then
  echo "Repositorio no encontrado, clonando..."
  git clone "$REPO_URL" "$REPO_DIR"
else
  echo "Repositorio encontrado, actualizando..."
  cd "$REPO_DIR" && git pull
fi

# Instalación de dependencias del backend
echo "Instalando dependencias del backend..."
cd "$BACKEND_DIR"
npm install

# Verificación si el archivo .env existe
if [ ! -f "$BACKEND_DIR/.env" ]; then
  echo "El archivo .env no existe, creando uno nuevo..."
  cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env" 
  echo ".env creado exitosamente."
else
  echo "El archivo .env ya existe."
fi


echo "Levantando el servidor del backend..."
npm run start

if ps aux | grep "node" | grep "$BACKEND_DIR"; then
  echo "Backend iniciado correctamente."
else
  echo "Hubo un error al iniciar el backend."
fi

echo "Automatización de backend completada."
