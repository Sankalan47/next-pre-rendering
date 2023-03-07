import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

const Post = ({ post }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.replace("/posts");
  };
  return (
    <>
      <Head>
        <title>Users Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <div className={styles.card} key={post.id}>
            <h1>{post.title}</h1>
            <hr />
            <br />
            <h3>{post.body}</h3>
          </div>
          <div>
            <button className={styles.card} onClick={handleRedirect}>
              <h4>Home</h4>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const data = await response.json();

  // const paths = data.map((post) => {
  //   return {
  //     params: {
  //       postId: `${post.id}`,
  //     },
  //   };
  // });
  return {
    paths: [
      {
        params: { postId: "1" },
      },
    ],
    // paths,
    fallback: blocking,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );

  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
}
