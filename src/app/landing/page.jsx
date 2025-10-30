import RoleCards from "@/components/RoleCards";

export const metadata = {
  title: "LeaseLink | Landing Page",
  description:
    "Welcome to LeaseLink — connecting landlords and tenants with easy communication, repair management, and feedback tools.",
};


export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1
        className="text-4xl md:text-5xl font-extrabold text-heading drop-shadow-lg"
      >
        Welcome to LeaseLink!
      </h1>

      <p className="mt-4 text-lg md:text-xl text-body max-w-3xl p-4 rounded bg-blur shadow-md">
        Say goodbye to communication problems with our wonderful website
        working brilliantly to bring you solutions for your problems.
      </p>

      <RoleCards />

      <div className="w-full flex justify-center mt-12">
        <div className="inline-block p-8 rounded-3xl bg-blur border-2 border-white/20 dark:border-gray-700/40 shadow-2xl">
          <h3 className="text-lg md:text-4xl font-semibold text-heading drop-shadow-md opacity-90">
            One App. Every Issue. No Hassle
          </h3>
        </div>
      </div>
    </div>
  );
}
