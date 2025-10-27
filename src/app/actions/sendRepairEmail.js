import { Resend } from "resend";
import { getLandlordByRoleId } from "@/app/actions/landlord";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

export async function sendRepairNotificationEmail({
  roleId,
  tenantName,
  propertyAddress,
  repairDescription,
}) {
  const landlord = await getLandlordByRoleId(roleId);
  console.log("LANDLORD EMAIL EMAIL:", landlord);

  if (!landlord) throw new Error("Landlord not found");

  await resend.emails.send({
    from: "noreply@resend.com",
    to: landlord.email,
    subject: `New Repair Request from ${tenantName}`,
    html: `<p>Hello ${landlord.full_name},</p>
            <p>${tenantName} submitted a new repair for property: ${propertyAddress}</p>
            <p>Description: ${repairDescription}</p>`,
  });
  console.log("email sent?!");
}
