require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/send-contact', async (req, res) => {
  try {
    const { nombre, email, asunto, message, consent } = req.body;

    const html = `
      <h2>Nuevo contacto desde HappyFest</h2>
      <table border="0" cellpadding="6" cellspacing="0">
        <tr><td><strong>Nombre</strong></td><td>${escapeHtml(nombre)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Asunto</strong></td><td>${escapeHtml(asunto)}</td></tr>
        <tr><td><strong>Mensaje</strong></td><td>${escapeHtml(message).replace(/\n/g,'<br>')}</td></tr>
        <tr><td><strong>Consentimiento</strong></td><td>${escapeHtml(consent || 'no')}</td></tr>
      </table>
    `;

    const info = await transporter.sendMail({
      from: process.env.FROM_ADDRESS,
      to: process.env.TO_ADDRESS,
      subject: asunto ? `Contacto: ${asunto}` : 'Nuevo contacto - HappyFest',
      html
    });

    return res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('send-contact error', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

function escapeHtml(str){
  if(!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

app.listen(PORT, ()=> console.log(`Email server running on port ${PORT}`));
