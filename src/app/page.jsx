import { SignInButton, SignOutButton } from "@clerk/nextjs";
import ThemedSection from "@/components/ThemedSection";

export default function HomePage() {
  return (
    <ThemedSection className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to LeaseLink!</h1>
      <div className="home-page-container">
        <div className="home-page-signs flex gap-4">
          <SignInButton />
          <SignOutButton />
        </div>
      </div>
    </ThemedSection>
  );
}
