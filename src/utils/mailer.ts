import nodemailer from "nodemailer";

export const sendEmail = async ({ date }: any) => {
  try {
    var transport = nodemailer.createTransport({
      host: "bulk.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "7808026f7475b98cc497f055d880836b",
      },
    });

    const mailOptions = {
      from: "hello@demomailtrap.co",
      to: ["ehteshamlodhih@gmail.com", "abdullah.sultan@powermatix.tech", "saif.rehman@powermatix.tech"],
      subject: "Neom Database Update Issue",
      html: `<div style="background-color: #f9f9f9; padding: 30px; display: grid; align-items: center; gap: 20px; font-family: 'Helvetica Neue', Arial, sans-serif; color: #2c3e50; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 0 auto; margin-top: 40px; justify-content: center; text-align: center;">
  <div>
    <h2 style="font-size: 24px; font-weight: 600; color: #34495e;">Neom Database Update Issue</h2>
    <p style="font-size: 16px; line-height: 1.5; color: #7f8c8d;">
      Dear Team,
    </p>
    <p style="font-size: 16px; line-height: 1.5; color: #7f8c8d;">
     It is to bring your attention that the data for <strong>${date}</strong> has not been successfully pushed to the database. This issue must be investigated, and resolved as soon as possible.
    </p>
  </div>
</div>
`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};