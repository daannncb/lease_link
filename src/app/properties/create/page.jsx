import CreateProperty from "@/components/CreateProperty";

export const metadata = {
    title: "Create Property, LeaseLink",
    description: "Add a new property to your LeaseLink account and start managing tenants and repairs.",
    icons: { icon: "/logo.png" },
};


export default function CreatePropertyPage() {
    return (
    <div className="p-6">
        <CreateProperty />
    </div>
    );
}
