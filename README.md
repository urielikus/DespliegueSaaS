
Despliegue de SaaS
Cómputo en la Nube  

Tecnología: Node.js + Express  
Servidor: Máquina Virtual en Microsoft Azure  
Autor: Uriel Villalobos

Se levanta un servidor HTTP en el puerto 3000 mediante la lectura de una variable de entorno llamada `MENSAJE_PERSONALIZADO` y la muestra en pantalla

Estructura del Proyecto

```
saas-app/
├── index.js          ← Código principal de la aplicación
├── package.json      ← Dependencias y scripts
├── .env.example      ← Plantilla de variables de entorno
├── .gitignore        ← Archivos ignorados por Git
└── README.md         ← Este archivo (manual de instrucciones)
```
---
Requisitos 

| Herramienta | Versión mínima | Cómo verificar |
|-------------|----------------|----------------|
| Node.js     | v18 o superior | `node --version` |
| npm         | v8 o superior  | `npm --version` |
| Acceso SSH  | —              | `ssh usuario@IP_DE_TU_VM` |

---

Configurar la VM en Azure

Paso 1: Conectarte a tu VM por SSH

Desde la computadora se abre la Terminal y ejecuta:

```bash
ssh usuario@IP_DE_TU_VM
```

Se tiene que reemplazar `usuario` con tu nombre de usuario y `IP_DE_TU_VM` con la IP pública de tu VM en Azure.

Paso 2: Instalar Node.js en la VM

Una vez dentro de la VM, ejecuta estos comandos:

bash

sudo apt update
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

Verificar instalación con los siguientes comandos:
node --version
npm --version


Paso 3: Abrir el puerto 3000 en Azure

Para ver la aplicación desde internet:
Se necesita configurar en Azure :
   Rango de puertos de destino: `3000`
   Protocolo: `TCP`
   Nombre: `puerto-app-saas`
Luego se hace clic en "Agregar"


Subir el Código a la VM

Usar Git clonando las carpetas en el repositorio con los siguientes comandos en terminal:

git clone https://github.com/TU_USUARIO/saas-app.git

Entrar a la carpeta
cd saas-app

Instalar dependencias
npm install


Configurar las Variables de Entorno

Este es el paso más importante de la tarea.

En la VM, definiremos las variables de entorno para que se activen cada vez que se inicia sesión:

Agregar al archivo de configuración de Bash
echo 'export MENSAJE_PERSONALIZADO="¡Hola desde mi VM en Azure!"' >> ~/.bashrc
echo 'export AUTOR="Tu Nombre"' >> ~/.bashrc
echo 'export PORT=3000' >> ~/.bashrc

Recargar la configuración:
source ~/.bashrc


Verificar que están configuradas:

bash
echo $MENSAJE_PERSONALIZADODebe mostrar: ¡Hola desde mi VM en Azure!


Ejecutar la Aplicación

Al ejecutar el siguiente comando se ejecuta la app pero se detiene al cerrar terminal:
bash
npm start


Deberías ver:

✅ Servidor corriendo en el puerto 3000
📦 Mensaje: ¡Hola desde mi VM en Azure!
👤 Autor: Tu Nombre


Existe una forma permanente con PM2 para que siga corriendo la appa al cerrar la terminal:

bash
sudo npm install -g pm2

Iniciar la aplicación con PM2
pm2 start index.js --name "saas-app"

Configurar para que inicie automáticamente al reiniciar la VM
pm2 startup
pm2 save

Comandos útiles de PM2:

bash
pm2 status          # Ver estado de la aplicación
pm2 logs saas-app   # Ver los logs en tiempo real
pm2 restart saas-app  # Reiniciar
pm2 stop saas-app     # Detener


Acceder a la Aplicación

Abre tu navegador y visita:

http://TU_IP:3000


Deberías ver la página web con tu mensaje personalizado.

Para verificar que el servidor responde correctamente:

bash
# Desde la VM misma
curl http://localhost:3000/health

# Respuesta esperada:
# {"status":"OK","mensaje":"¡Hola desde mi VM en Azure!","autor":"Tu Nombre","puerto":"3000"
