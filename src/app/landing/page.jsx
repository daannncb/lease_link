//! make page here with are you a tenant or a landlord
import Link from "next/link";

//once either button is clicked, the database tables are updated
export default function Landing() {
  return (
    <div>
      <h1>
        {" "}
        Welcome to LeaseLink! Say goodbye to communication problems with our
        wonderful website working wbrilliantly to wbring you solutions for your
        problems
      </h1>
      <p>To get started, are you a tenant or a landlord?</p>

      <div>
        <Link href="/create-tenant">
          <button type="submit">Tenant</button>
        </Link>

        <Link href="/properties/create">
          <button>Landlord</button>
        </Link>
      </div>
    </div>
  );
}
