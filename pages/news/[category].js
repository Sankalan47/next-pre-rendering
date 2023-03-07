import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const NewsListByCategory = ({ articles, category }) => {
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
          <h1>Lists of News in {category}</h1>
        </div>
        <div className={styles.center}>
          <div className={styles.grid}>
            {articles.map((article) => {
              return (
                <div className={styles.card} key={article.id}>
                  <h2>{article.id}</h2>
                  <h2>{article.title}</h2>
                  <Link href={`/`} passHref>
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

export default NewsListByCategory;

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  console.log(query);
  res.setHeader("Set-Cookie", "name=San");
  const { category } = params;
  const response = await fetch(
    `http://localhost:4000/news?category=${category}`
  );

  const data = await response.json();

  return {
    props: {
      articles: data,
      category,
    },
  };
}
