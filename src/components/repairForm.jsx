"use client";
import { useState } from "react";
import { sendRepairNotificationEmail } from "@/app/actions/sendRepairEmail";

export default function RepairForm({ roleId, propertyAddress, tenantName }) {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendRepairNotificationEmail({
        roleId,
        tenantName,
        propertyAddress,
        repairDescription: description,
      });
      alert("Repair submitted! Email notification sent to landlord.");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to submit repair.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="repair-description">Describe the repair</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the repair"
        required
      />
      <button type="submit">Submit Repair</button>
    </form>
  );
}
