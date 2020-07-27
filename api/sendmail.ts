import { NowRequest, NowResponse } from '@vercel/node';
import sg from '@sendgrid/mail';

sg.setApiKey(process.env.SG_API_KEY);

const allowList = ['localhost:3000', 'gs.nickradford.dev', 'gamesearch.xyz'];

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
    sg.send(msg).then(
      () => {
        res.status(200);
        res.end();
      },
      (err) => {
        console.log(req.headers);
        console.info(req.body);
        console.error(err);
        res.status(500);
        res.json({ msg: 'An error ocurred while sending the email.' });
      }
    );
  } else {
    console.info(req.headers);
    console.info(req.body);

    res.statusCode = 406;
    res.json({ msg: "You're not allowed to do that, sorry." });
    res.end();
  }
};
