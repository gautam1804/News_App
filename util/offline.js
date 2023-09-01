import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import Head from "next/head";

const OfflinePage = ({ newsArticles }) => {
  const [cachedArticles, setCachedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cached articles from localStorage
    const cachedData = localStorage.getItem("cachedArticles");
    if (cachedData) {
      setCachedArticles(JSON.parse(cachedData));
    }
    setIsLoading(false);
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    
    try {
      // Fetch fresh news articles using your API
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
      const newsResponse = await response.json();
      const freshNewsArticles = newsResponse.articles || [];
      
      // Cache the fresh articles in localStorage
      localStorage.setItem("cachedArticles", JSON.stringify(freshNewsArticles));
      setCachedArticles(freshNewsArticles);
    } catch (error) {
      console.error("Error fetching news articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Offline news - Nextjs News App</title>
      </Head>
      <main>
        <h1>Offline News</h1>
        <Button variant="primary" onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : "Refresh"}
        </Button>
        <NewsArticlesGrid articles={cachedArticles} />
      </main>
    </>
  );
};

OfflinePage.getInitialProps = async () => {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
  const newsResponse = await response.json();
  const newsArticles = newsResponse.articles || [];

  return {
    newsArticles,
  };
};

export default OfflinePage;
