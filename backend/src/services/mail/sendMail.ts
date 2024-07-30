import nodemailer from 'nodemailer';

export async function sendMail(to: string, subject: string, body: string): Promise<boolean> {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const isOk = await transport.verify();
    if (isOk) {
      await transport.sendMail({
        from: SMTP_EMAIL,
        to,
        subject,
        html: body,
      });
      return true;
    } else {
      throw new Error('Transport not ready');
    }
  } catch (e) {
    throw new Error(`Cannot send email: ${(e as Error).message}`);
  }
}
