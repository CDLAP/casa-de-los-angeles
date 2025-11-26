# 🎉 CONFIGURACIÓN COMPLETA - 100% GRATIS con Gmail

## ✅ TU SETUP GRATUITO:
- **Email de negocio:** contacto@casadelosangelespuebla.com
- **Email personal (gratis):** cdlap2025@gmail.com
- **Forwarding:** Namecheap → Gmail gratis
- **Costo:** $0/mes (vs $396/mes) 💰

---

## 📧 PASO 1: EMAIL FORWARDING EN NAMECHEAP

### Configuración (5 minutos):

1. **Entra a Namecheap:** https://www.namecheap.com
2. **Login** con tu cuenta
3. **Domain List** → Busca: `casadelosangelespuebla.com`
4. **Manage** → **Advanced DNS** o **Email Forwarding**
5. Si dice "Email Forwarding is not enabled" → **Enable**
6. **Add Forwarder:**
   - **From:** contacto
   - **To:** cdlap2025@gmail.com
7. **Save**

✅ **Listo!** Todos los emails a contacto@casadelosangelespuebla.com llegarán a cdlap2025@gmail.com

---

## 📬 PASO 2: GMAIL - RESPONDER COMO

Para que tus respuestas parezcan venir de contacto@casadelosangelespuebla.com:

1. **Abre Gmail** (cdlap2025@gmail.com)
2. **⚙️ Configuración** → **Ver toda la configuración**
3. Pestaña **"Cuentas e importación"**
4. **"Enviar correo como:"** → **Añadir otra dirección**
5. Llena:
   - **Nombre:** Casa de los Ángeles
   - **Email:** contacto@casadelosangelespuebla.com
   - **Desmarca** "Tratar como alias"
6. **Siguiente**
7. Configurar SMTP:
   - **Servidor:** smtp.gmail.com
   - **Puerto:** 587
   - **Usuario:** cdlap2025@gmail.com
   - **Contraseña:** [Tu contraseña]
   - **TLS:** ✅
8. **Agregar cuenta**
9. **Verificar** con el código que llegará a tu Gmail

✅ **Listo!** Ahora puedes enviar como contacto@casadelosangelespuebla.com

---

## 📊 PASO 3: GOOGLE SHEETS + APPS SCRIPT

### A. Crear Google Sheet:

1. Ve a https://sheets.google.com con `cdlap2025@gmail.com`
2. Crea nueva hoja: **"Reservaciones Casa de los Ángeles"**
3. En la primera fila, pon estos encabezados:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Fecha/Hora | Nombre | Email | Teléfono | Fecha Reserva | Hora | Personas | Mensaje |

### B. Configurar Apps Script:

1. En tu Google Sheet: **Extensiones** → **Apps Script**
2. Borra el código que aparece
3. **Copia y pega este código completo:**

```javascript
// ============================================
// CONFIGURACIÓN - YA ESTÁ LISTA PARA TI
// ============================================
const CONFIG = {
  EMAIL_NOTIFICACION: "cdlap2025@gmail.com",
  NEGOCIO: "Casa de los Ángeles",
  TELEFONO: "+52 220 622 4222",
  DIRECCION: "Av. Don Juan de Palafox y Mendoza 222, Centro Histórico, Puebla",
  EMAIL_NEGOCIO: "contacto@casadelosangelespuebla.com"
};

// ============================================
// NO TOQUES NADA DE AQUÍ PARA ABAJO
// ============================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Agregar datos a la hoja
    sheet.appendRow([
      data.timestamp,
      data.nombre,
      data.email,
      data.telefono,
      data.fecha,
      data.hora,
      data.personas,
      data.mensaje || 'N/A'
    ]);
    
    // Enviar email de confirmación al cliente
    enviarEmailCliente(data);
    
    // Enviar notificación al negocio
    enviarNotificacionNegocio(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Reservación guardada exitosamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function enviarEmailCliente(data) {
  const asunto = `✅ Confirmación de Reservación - ${CONFIG.NEGOCIO}`;
  
  const mensaje = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a4d2e 0%, #2d5f3f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Casa de los Ángeles</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Cafetería & Centro de Cultura</p>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1a4d2e; margin-top: 0;">¡Hola ${data.nombre}!</h2>
        
        <p style="color: #333; line-height: 1.6;">
          Gracias por tu interés en <strong>Casa de los Ángeles</strong>. 
          Hemos recibido tu solicitud de reservación con los siguientes datos:
        </p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #c9a961; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>📅 Fecha:</strong> ${data.fecha}</p>
          <p style="margin: 5px 0;"><strong>🕐 Hora:</strong> ${data.hora}</p>
          <p style="margin: 5px 0;"><strong>👥 Personas:</strong> ${data.personas}</p>
          ${data.mensaje && data.mensaje !== 'N/A' ? `<p style="margin: 5px 0;"><strong>💬 Nota:</strong> ${data.mensaje}</p>` : ''}
        </div>
        
        <p style="color: #333; line-height: 1.6;">
          Nos pondremos en contacto contigo <strong>en las próximas horas</strong> para confirmar tu reservación.
        </p>
        
        <div style="background-color: #fff8e7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #666; font-size: 14px; text-align: center;">
            <strong>⏰ Horarios:</strong> Lunes a Domingo, 8:00 AM a 8:00 PM
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        
        <div style="text-align: center; color: #666; font-size: 14px;">
          <p style="margin: 5px 0;"><strong>${CONFIG.NEGOCIO}</strong></p>
          <p style="margin: 5px 0;">📍 ${CONFIG.DIRECCION}</p>
          <p style="margin: 5px 0;">📞 ${CONFIG.TELEFONO}</p>
          <p style="margin: 5px 0;">📧 ${CONFIG.EMAIL_NEGOCIO}</p>
          <p style="margin: 20px 0 0 0; font-size: 12px; color: #999;">
            Te esperamos pronto ✨
          </p>
        </div>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: data.email,
    subject: asunto,
    htmlBody: mensaje
  });
}

function enviarNotificacionNegocio(data) {
  const asunto = `🔔 Nueva Reservación - ${CONFIG.NEGOCIO}`;
  
  const mensaje = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #c9a961; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">🔔 Nueva Reservación Recibida</h2>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px;">
        <h3 style="color: #1a4d2e; margin-top: 0;">Datos del Cliente:</h3>
        
        <table style="width: 100%; background-color: white; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold; width: 40%;">Nombre:</td>
            <td style="padding: 12px;">${data.nombre}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold;">Email:</td>
            <td style="padding: 12px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold;">Teléfono:</td>
            <td style="padding: 12px;"><a href="tel:${data.telefono}">${data.telefono}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold;">Fecha:</td>
            <td style="padding: 12px;">${data.fecha}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold;">Hora:</td>
            <td style="padding: 12px;">${data.hora}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 12px; font-weight: bold;">Personas:</td>
            <td style="padding: 12px;">${data.personas}</td>
          </tr>
          ${data.mensaje && data.mensaje !== 'N/A' ? `
          <tr>
            <td style="padding: 12px; font-weight: bold; vertical-align: top;">Mensaje:</td>
            <td style="padding: 12px;">${data.mensaje}</td>
          </tr>
          ` : ''}
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #fff8e7; border-left: 4px solid #c9a961;">
          <p style="margin: 0; color: #666;">
            <strong>⏰ Recibido:</strong> ${data.timestamp}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" 
             style="display: inline-block; background-color: #1a4d2e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Ver en Google Sheets
          </a>
        </div>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: CONFIG.EMAIL_NOTIFICACION,
    subject: asunto,
    htmlBody: mensaje
  });
}
```

4. **💾 Guarda** el script (Ctrl+S o Cmd+S)
5. Ponle nombre: "Sistema de Reservaciones"

### C. Implementar como Web App:

1. Haz clic en **Implementar** → **Nueva implementación**
2. Clic en ⚙️ → Selecciona **Aplicación web**
3. Configura:
   - **Descripción:** Formulario de reservaciones
   - **Ejecutar como:** Yo
   - **Quién tiene acceso:** Cualquier persona
4. **Implementar**
5. **COPIA LA URL** (guárdala, la necesitarás en el Paso 4)
   - Se ve así: `https://script.google.com/macros/s/AKfy...`

---

## 🔗 PASO 4: CONECTAR CON EL SITIO WEB

1. Abre el archivo: `/src/components/sections/Contact.tsx`
2. Busca la línea 30 que dice:
   ```javascript
   const SCRIPT_URL = 'TU_URL_DE_GOOGLE_SCRIPT_AQUI'
   ```
3. Reemplaza con la URL que copiaste:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfy...'
   ```
4. **Guarda** el archivo

---

## ✅ PASO 5: PROBAR TODO

1. Refresca tu sitio (Cmd+R o Ctrl+R)
2. Ve a la sección **Contacto**
3. Llena el formulario con datos de prueba
4. Haz clic en **"Confirmar Reservación"**
5. Deberías ver: **"¡Reservación enviada!"**

### Verifica que funcione:

✅ **En Google Sheets:** Los datos aparecen en la hoja
✅ **En cdlap2025@gmail.com:** 
   - Recibes notificación con los datos
   - El cliente recibe email de confirmación

---

## 📧 EMAILS QUE SE ENVIARÁN:

### 1. Email al Cliente:
```
De: cdlap2025@gmail.com
Para: cliente@email.com
Asunto: ✅ Confirmación de Reservación - Casa de los Ángeles

[Diseño bonito con colores verde y dorado]

¡Hola [Nombre]!
Gracias por tu interés en Casa de los Ángeles...
📅 Fecha: [Fecha]
🕐 Hora: [Hora]
👥 Personas: [X]
```

### 2. Notificación para Ti:
```
De: cdlap2025@gmail.com
Para: cdlap2025@gmail.com
Asunto: 🔔 Nueva Reservación - Casa de los Ángeles

Datos del Cliente:
Nombre: [Nombre]
Email: [Email]
Teléfono: [Teléfono]
[Ver en Google Sheets]
```

---

## 🎉 RESUMEN FINAL

### ✅ LO QUE TIENES AHORA:

1. **Email Forwarding:**
   - contacto@casadelosangelespuebla.com → cdlap2025@gmail.com

2. **Responder Como:**
   - Respondes desde Gmail pero parece que viene de contacto@casadelosangelespuebla.com

3. **Reservaciones:**
   - Se guardan en Google Sheets (cdlap2025@gmail.com)
   - Email automático al cliente
   - Notificación a tu Gmail

4. **Costo Total:**
   - **$0/mes** (en lugar de $396/mes)
   - **Ahorro: $4,752/año** 🎉

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Si el forwarding no funciona:
- Espera 30-60 minutos (DNS puede tardar)
- Revisa spam en cdlap2025@gmail.com
- Verifica que escribiste bien el email

### Si el formulario no envía:
- Revisa la URL del script
- Ve a Apps Script → **Ejecuciones** para ver errores
- Verifica los permisos cuando se pidan

### Primera ejecución:
- Google pedirá permisos
- Acepta: "Revisar permisos" → Permitir

---

## 📞 ¿NECESITAS AYUDA?

Si algo no funciona, pregúntame:
- ¿En qué paso estás?
- ¿Qué error ves?
- ¿Qué mensaje aparece?

**¡Estamos a un paso de tenerlo todo funcionando gratis!** 🚀
