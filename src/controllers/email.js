import { sendHelpEmail } from '../services/sendEmail.js';

export const sendEmailController = async (req, res) => {
  const { email, comment } = req.body;
  const { name } = req.user;
  await sendHelpEmail(email, comment, name);
  res.json({
    message: 'Request help email was successfully sent!',
    status: 200,
    data: { email, name, comment },
  });
};
