const nodemailer = require('nodemailer');
const EMAIL = {
    user: 'montessamuel1105@gmail.com',
    pass: 'siap gjfp zper gxqy',
};


async function sendEmail(userEmail, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL.user,
                pass: EMAIL.pass,
            },
        });

        const mailOptions = {
            from: EMAIL.user,
            to: userEmail,
            subject: subject,
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;