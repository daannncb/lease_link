import PropertyCard from "@/components/PropertyCard";
export default function LandlordDash() {
  return (
    <>
      <h2 className="text-xl font-bold text-slate-700 mb-2">
        Landlord Dashboard
      </h2>
      <PropertyCard property={property} />
    </>
  );
}
