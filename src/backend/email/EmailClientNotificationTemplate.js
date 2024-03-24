class EmailClientNotificationTemplate {
    constructor(firstName) {
        this.firstName = firstName;
    }
    html() {
        return `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                    }
                    .signature {
                        margin-top: 20px;
                        font-style: italic;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Dear ${this.firstName},</p>
                    <p>We're pleased to inform you that your form has been successfully submitted. Thank you for choosing to engage with us.</p>
                    <p>Your submission is important to us, and our team will promptly review the information provided. Should there be any need for further clarification or if we require additional details, we will reach out to you promptly.</p>
                    <p>In the meantime, if you have any questions or concerns, please don't hesitate to contact us. We're here to assist you every step of the way.</p>
                    <p>Thank you once again for choosing deno-websites.</p>
                    <p>Best regards,<br>
                    DenoneroDev</p>
                    <p>deno.websites@gmail.com</p>
                    <p class="signature">deno-websites</p>
                </div>
            </body>
            </html>
        `;
    }
}
module.exports = EmailClientNotificationTemplate;