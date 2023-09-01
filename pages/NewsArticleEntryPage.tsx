import NewsArticlesGrid from './NewsArticlesGrid';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import NextNProgress from 'nextjs-progressbar';
import styles from '../styles/NewsArticleEntry.module.css'; // Import your CSS styles


type BreakingNewsPageProps = {
  newsArticles?: INewsArticle[];
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key={'title'}>Breaking news - Nextjs News App</title>
      </Head>
      <NextNProgress />
      <NavBar />
      <main>
        <h1 className={styles['articleCard']}>Breaking News</h1> {/* Apply the articleCard style */}
        {newsArticles !== undefined ? (
          <>
            <NewsArticlesGrid articles={newsArticles} />
          </>
        ) : (
          <h1>Error</h1>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsResponse: INewsArticlesResponse = await response.json();
  return {
    props: {
      newsArticles: newsResponse.articles || null,
    },
  };
  // Let error go to 500 pages
};
