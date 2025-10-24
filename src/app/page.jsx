import { db } from "../../dbConnection";

export default async function HomePage() {
  const res = await db.query(`SELECT * FROM properties`);
  const data = res.rows;

  console.log(data);
  return (
    <div>
      <p>Welcome to LeaseLink!</p>
      <p>Dan&apos;s House is in:</p>
      {data.map((datum) => {
        return (
          <div key={datum.id}>
            <p>{datum.country}</p>
          </div>
        );
      })}
    </div>
  );
}
