Despliegue de SaaS en Azure

Jose Uriel Villalobos Medina

Tarea de Cómputo en la Nube  
Tecnología: Node.js + Express  
Servidor: Máquina Virtual en Microsoft Azure

---

## Descripción

Esta aplicación web básica levanta un servidor HTTP en el puerto 3000 y lee una variable de entorno llamada MENSAJE_PERSONALIZADO para mostrar un mensaje personalizado en pantalla. También incluye una ruta /health para verificar que el servidor esté funcionando correctamente.


---

## Estructura del proyecto

    saas-app/
        index.js          - Código principal de la aplicación
        package.json      - Dependencias y scripts
        .env.example      - Plantilla de variables de entorno
        .gitignore        - Archivos ignorados por Git
        README.md         - Manual de instrucciones

---

## Requisitos

Node.js v18 o superior. Para verificar: node --version  
npm v8 o superior. Para verificar: npm --version  
Acceso SSH a la VM. Para conectarse: ssh usuario@IP_DE_LA_VM

---

## 1 - Configurar la VM en Azure

a).- Conectarse a la VM por SSH

Desde la terminal del equipo local ejecutar:

    ssh -i ~/.ssh/llave.pem azureuser@IP_DE_LA_VM

b): Instalar Node.js en la VM

    sudo apt update
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs

Verificar que se instaló correctamente:

    node --version
    npm --version

c): Abrir el puerto 3000 en Azure

Entrar al Portal de Azure, seleccionar la máquina virtual, ir a la sección Redes y agregar una regla de puerto de entrada con los siguientes valores: puerto 3000, protocolo TCP.

---

##  2 - Subir el código a la VM

Usar Git

    git clone https://gitlab.com/usuario/despliegue-de-saas.git
    cd despliegue-de-saas
    npm install

Luego en la VM:

    cd ~/saas-app
    npm install

---

## 3 - Configurar las variables de entorno

Este es el punto central de la práctica. En lugar de escribir el mensaje directamente en el código, se define como una variable del sistema operativo y la aplicación la lee en tiempo de ejecución.

Para definirlas de forma permanente en la VM:

    echo 'export MENSAJE_PERSONALIZADO="Bienvenidos a mi aplicación SaaS desplegada en Azure"' >> ~/.bashrc
    echo 'export AUTOR="Uriel Villalobos"' >> ~/.bashrc
    echo 'export PORT=3000' >> ~/.bashrc
    source ~/.bashrc

Para verificar que quedaron correctamente definidas:

    echo $MENSAJE_PERSONALIZADO

---

## 4 - Ejecutar la aplicación

Forma básica (se detiene al cerrar la terminal):

    npm start

Forma permanente usando PM2 (la aplicación sigue corriendo aunque se cierre la sesión SSH):

    sudo npm install -g pm2
    pm2 start index.js --name "saas-app"
    pm2 startup
    pm2 save

Comandos útiles de PM2:

    pm2 status              - ver estado de la aplicación
    pm2 logs saas-app       - ver los logs en tiempo real
    pm2 restart saas-app    - reiniciar
    pm2 stop saas-app       - detener

---

## 5 - Acceder a la aplicación

Abrir el navegador y visitar:

    http://IP_DE_LA_VM:3000

Para verificar que el servidor responde:

    curl http://localhost:3000/health

---

## Parte 6 - Cambiar el mensaje sin modificar el código

Esta es la ventaja principal de usar variables de entorno. Para actualizar el mensaje:

    pm2 stop saas-app
    export MENSAJE_PERSONALIZADO="Nuevo mensaje"
    pm2 restart saas-app

El nuevo mensaje aparecerá en pantalla sin haber tocado el código fuente.
ø
---

## Variables de entorno disponibles

MENSAJE_PERSONALIZADO - Mensaje que se muestra en la página. Default: no se configuró un mensaje.  
AUTOR - Nombre del autor. Default: Estudiante.  
PORT - Puerto del servidor. Default: 3000.

---

