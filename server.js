const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static('public'));

// In-memory storage
const admissions = [];

// Serve the form at /admission
app.get('/admission', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Handle form submission
app.post('/admission', (req, res) => {
  const { name, email, phone, course } = req.body;

  // Save the student info in memory
  admissions.push({ name, email, phone, course });

  // Send confirmation message
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Application Confirmation</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background: #f0f8ff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
      }
      .message-box {
        background: white;
        border: 2px solid #007bff;
        padding: 30px 40px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        max-width: 500px;
      }
      h2 {
        color: #007bff;
        margin-bottom: 10px;
      }
      p {
        font-size: 18px;
        color: #333;
        margin-bottom: 20px;
      }
      a {
        display: inline-block;
        padding: 10px 20px;
        background: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        transition: background 0.3s ease;
      }
      a:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="message-box">
      <h2>Thank you, ${name}!</h2>
      <p>You’ve successfully applied for the <strong>${course}</strong> program.</p>
      <a href="/admission">← Go Back to Form</a>
    </div>
  </body>
  </html>
`);

});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/admission`);
});
