import { NowRequest, NowResponse } from '@vercel/node';
import sg from '@sendgrid/mail';

sg.setApiKey(process.env.SG_API_KEY);

const allowList = ['localhost:3000', 'gs.nickradford.dev'];

export default (req: NowRequest, res: NowResponse) => {
  const host = req.headers['x-forwarded-host'];

  const { name, email, feedback } = req.body;

  if (allowList.indexOf(host as string) !== -1) {
    const msg: sg.MailDataRequired = {
      to: process.env.CONTACT_FORM_TO,
      from: 'no-reply@gs.nickradford.dev',
      replyTo: email,
      templateId: 'd-874e16697d0d467596249e3f80d0b285',
      dynamicTemplateData: {
        name,
        email,
        feedback,
      },
    };
    sg.send(msg).then(() => {
      res.status(200);
      res.end();
    });
  } else {
    res.statusCode = 406;
    res.end();
  }
};
