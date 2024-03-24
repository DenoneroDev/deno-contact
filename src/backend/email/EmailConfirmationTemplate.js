class EmailConfirmationTemplate {
    constructor(firstName, code) {
        this.firstName = firstName;
        this.code = code;
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
                    <p>Thank you for reaching out to us through our contact page. To ensure the security of our communication and to verify your identity, we require you to confirm your email address by entering the verification code below:</p>
                    <p><strong>Verification Code:</strong> ${this.code}</p>
                    <p>Please enter this code in the designated field on our contact page to proceed with your inquiry. If you did not initiate this contact request, please disregard this email.</p>
                    <p>We appreciate your cooperation and look forward to assisting you further.</p>
                    <p>Best regards,<br>
                    DenoneroDev</p>
                    <p class="signature">deno-websites</p>
                </div>
            </body>
            </html>
        `;
    }
}
module.exports = EmailConfirmationTemplate;
