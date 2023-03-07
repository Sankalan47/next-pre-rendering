import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function EventList({ eventList }) {
  const router = useRouter();

  const [events, setEvents] = useState(eventList);
  const handleFilter = async () => {
    const response = await fetch(
      `http://localhost:4000/events?category=sports`
    );
    const data = await response.json();
    router.push("/events?category=sports", undefined, { shallow: true });
    setEvents(data);
  };
  return (
    <>
      <Head>
        <title>Users Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}></div>

        {/* <div className={styles.center}> */}
        <button onClick={handleFilter}>Sports Events</button>
        {/* </div> */}
        <div className={styles.center}>
          <div className={styles.grid}>
            {events.map((event) => {
              return (
                <div className={styles.card} key={event.id}>
                  <h2>
                    {event.title} {event.date} {event.category}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { category } = query;
  const queryString = category ? "category=sports" : "";
  const response = await fetch(`http://localhost:4000/events?${queryString}`);
  const data = await response.json();

  return {
    props: {
      eventList: data,
    },
  };
}
