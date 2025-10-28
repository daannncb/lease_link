"use server";
import nodemailer from "nodemailer";
import { getLandlordByRoleId } from "@/app/actions/landlord";

export async function sendRepairNotificationEmail({
  roleId,
  tenantName,
  propertyAddress,
  repairDescription,
}) {
  const landlord = await getLandlordByRoleId(roleId);

  if (!landlord) throw new Error("Landlord not found");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // email details
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: landlord.email, // recipient (landlord)
    subject: `New Repair Request from ${tenantName}`,
    html: `
      <p>Hi <strong>${landlord.full_name}</strong>,</p>
      <p><strong>${tenantName}</strong> submitted a new repair request for:</p>
      <p><em>${propertyAddress}</em></p>
      <p><strong>Description:</strong> ${repairDescription}</p>
      <p>Thank you,<br/>The LeaseLink App</p>
    `,
  };

  // send email
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully:", info.response);

  return { success: true };
}
