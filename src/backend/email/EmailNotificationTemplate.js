class EmailNotificationTemplate {
    constructor(firstName, lastName, companyName, email, subject, text) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.email = email;
        this.subject = subject;
        this.text = text;
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
                    .field {
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="field">
                        <strong>First name:</strong> ${this.firstName}
                    </div>
                    <div class="field">
                        <strong>Last name:</strong> ${this.lastName}
                    </div>
                    ${this.companyName ? `
                    <div class="field">
                        <strong>Company name:</strong> ${this.companyName}
                    </div>` : ""}
                    <div class="field">
                        <strong>Email:</strong> ${this.email}
                    </div>
                    <hr>
                    <div class="field">
                        <strong>Subject:</strong> ${this.subject}
                    </div>
                    <div class="field">
                        <strong>Text:</strong> ${this.text}
                    </div>
                </div>
            </body>
            </html>
        `;
    }
}
module.exports = EmailNotificationTemplate;
