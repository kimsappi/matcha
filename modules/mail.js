const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	sendmail: true,
	newline: 'unix'
});

const sendEmail = (to, subject, content, html) => {
	const email = {
		to: to,
		subject: subject,
		... html ? {html: content} : {text: content}
	};

	transporter.sendMail({email});
};

module.exports = sendEmail;
