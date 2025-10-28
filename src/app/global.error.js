import Link from "next/link";

export default function ErrorPage({ reset }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-(--color-sage-green) text-(--color-beige) px-4">
      <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/20 backdrop-blur-md shadow-lg border border-white/30">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Something Went Wrong!
        </h1>

        <p className="mb-8 text-center max-w-lg">
          We hit a snag while loading this page. Don&apos;t worry—your repairs
          and messages are safe. Let&apos;s get you back to where you need to
          be.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="bg-(--color-beige) text-(--color-sage-green) font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-beige/90 transition text-center"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
