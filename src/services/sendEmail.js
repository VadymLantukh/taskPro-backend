import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { TEMPLATES_DIR } from '../constants/templatesDir.js';
import { sendEmail } from '../utils/sendEmail.js';
import { env } from '../utils/env.js';
import { SMTP } from '../constants/SMPT.js';

export const sendHelpEmail = async (email, comment, name) => {
  if (!name) name = 'Dear Friend';

  const needHelpTemplatePath = path.join(TEMPLATES_DIR, 'needHelp.html');

  const templateSource = (await fs.readFile(needHelpTemplatePath)).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name,
    comment,
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Help Request',
    html,
  });
};
