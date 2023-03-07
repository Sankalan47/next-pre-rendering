import Post from "@/components/Post";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const PostList = ({ posts }) => {
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
          <h1>Lists of Posts</h1>
        </div>
        <div className={styles.center}>
          <div className={styles.grid}>
            {posts.map((post) => {
              return (
                <div className={styles.card} key={post.id}>
                  <Post post={post} />
                  <Link href={`posts/${post.id}`} passHref>
                    <p className={inter.className}>
                      Learn <span>-&gt;</span>
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default PostList;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return {
    props: {
      posts: data.slice(0, 4),
    },
  };
}
