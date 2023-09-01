import NewsArticlesGrid from "../pages/NewsArticlesGrid";
import NewsArticlesList from "../pages/NewsArticlesList";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import NextNProgress from "nextjs-progressbar";
import "../styles/app.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useState } from "react"; // Import useState


type BreakingNewsPageProps = {
  newsArticles?: INewsArticle[];
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  const [isGridView, setIsGridView] = useState(false); // State variable to track grid view

  // Function to toggle grid view
  const toggleGridView = () => {
    setIsGridView((prevState) => !prevState);
  };

  return (
    <>
      <Head>
        <title key={"title"}>Breaking news - Nextjs News App</title>
      </Head>
      <main>
        <NextNProgress />

        <h1>Breaking News</h1>

        <NavBar />
        
        {/* Add the toggle button */}
        <Button variant="primary" onClick={toggleGridView} style={{  color: "darkgray",
    background: "black",
    borderRadius: "5px",
    margin: "3px",
    padding: "10px",
    textAlign: "center",
    fontSize: "small",}} >
          {isGridView ? "Switch to List View" : "Switch to Grid View"}
        </Button>

        {newsArticles !== undefined ? (
          // Conditionally render the NewsArticlesGrid based on isGridView state
          isGridView ? (
            <NewsArticlesGrid articles={newsArticles} />
          ) : (
            <NewsArticlesList articles={newsArticles} />
          )
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
      newsArticles: newsResponse.articles,
    },
  };
  // Let error go to 500 page
};
