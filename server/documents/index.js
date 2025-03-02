module.exports = ({ name, age, price, receiptId }) => {
  const today = new Date().toLocaleString();
  return `
    <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; }
                .header { text-align: center; margin-bottom: 20px; }
                .header img { width: 100px; height: auto; }
                .title { text-align: center; font-size: 24px; font-weight: bold; margin-top: 10px; }
                .content { margin-top: 20px; font-size: 16px; }
                .content p { margin: 8px 0; }
                .footer { text-align: center; margin-top: 30px; font-size: 12px; color: gray; }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="https://img.freepik.com/free-vector/gradient-ss-logo-template_23-2149245206.jpg" alt="Company Logo">
            </div>
            <div class="title">Receipt</div>
            <div class="content">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Price:</strong> $${price}</p>
                <p><strong>Receipt ID:</strong> ${receiptId}</p>
                <p><strong>Date & Time:</strong> ${today}</p>
            </div>
            <div class="footer">
                Thank you for your purchase! <br>
                © 2025 MNZ. All Rights Reserved.
            </div>
        </body>
    </html>
    `;
};
