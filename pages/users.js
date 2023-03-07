import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import User from "@/components/user";

const inter = Inter({ subsets: ["latin"] });

function UserList({ users }) {
  return (
    <>
      <Head>
        <title>Users Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}></div>

        <div className={styles.center}>
          <h1>This is the Users Page</h1>
        </div>
        <div className={styles.center}>
          <div className={styles.grid}>
            {users.map((user) => {
              return (
                <div className={styles.card} key={user.id}>
                  <User user={user} />
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default UserList;

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data);

  return {
    props: {
      users: data,
    },
  };
}
