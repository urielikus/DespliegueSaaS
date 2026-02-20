const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Lee la variable de entorno MENSAJE_PERSONALIZADO
const mensaje = process.env.MENSAJE_PERSONALIZADO || '¡Hola! No se configuró un mensaje personalizado.';
const autor = process.env.AUTOR || 'Estudiante';

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mi App SaaS</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 48px;
          max-width: 600px;
          width: 90%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .badge {
          background: #667eea;
          color: white;
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 24px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        h1 { color: #2d3748; font-size: 28px; margin-bottom: 16px; }
        .mensaje {
          background: #f7f8fc;
          border-left: 4px solid #667eea;
          padding: 20px;
          border-radius: 8px;
          font-size: 18px;
          color: #4a5568;
          margin: 24px 0;
          text-align: left;
        }
        .autor { color: #a0aec0; font-size: 14px; margin-top: 24px; }
        .env-info {
          background: #e8f4fd;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 13px;
          color: #2b6cb0;
          margin-top: 16px;
          font-family: monospace;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">☁️ Desplegado en Azure</span>
        <h1>Mi Aplicación SaaS</h1>
        <div class="mensaje">
          💬 ${mensaje}
        </div>
        <p class="autor">— ${autor}</p>
        <div class="env-info">
          Variable: MENSAJE_PERSONALIZADO<br>
          Puerto: ${PORT}
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', mensaje, autor, puerto: PORT });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
  console.log(`📦 Mensaje: ${mensaje}`);
  console.log(`👤 Autor: ${autor}`);
});
