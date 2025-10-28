import { db } from "@/utils/dbConnection";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import "./globals.css";

export default async function HomePage() {
  return (
    <div>
      <p className="h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-300">
        Welcome to LeaseLink!
      </p>
      <div className="home-page-container">
        <div className="home-page-signs">
          <SignInButton />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
