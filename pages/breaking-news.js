import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import NewsArticlesGrid from "./NewsArticlesGrid";
import Head from "next/head";
import { auth, firestore } from "../services/firebase"; // Import your Firebase authentication and Firestore instances

const BreakingNewsPage = ({ newsArticles }) => {
  const [user, setUser] = useState(null);
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchFavoriteArticles(authUser.uid);
      } else {
        setUser(null);
        setFavoriteArticles([]);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchFavoriteArticles = async (userId) => {
    try {
      const favoritesRef = firestore.collection("users").doc(userId).collection("favorites");
      const favoritesSnapshot = await favoritesRef.get();
      const favoritesData = favoritesSnapshot.docs.map((doc) => doc.data());
      setFavoriteArticles(favoritesData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching favorite articles:", error);
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (articleUrl) => {
    try {
      const favoriteDoc = favoriteArticles.find((article) => article.url === articleUrl);
      if (favoriteDoc) {
        await firestore.collection("users").doc(user.uid).collection("favorites").doc(favoriteDoc.id).delete();
        fetchFavoriteArticles(user.uid);
      }
    } catch (error) {
      console.error("Error removing favorite article:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Breaking news - Nextjs News App</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <>
            {user && (
              <Button variant="primary" href="/favorites">
                View Favorites
              </Button>
            )}
            <NewsArticlesGrid articles={newsArticles} favoriteArticles={favoriteArticles} onRemoveFavorite={handleRemoveFavorite} />
          </>
        )}
      </main>
    </>
  );
};

// Fetch breaking news articles using your API
BreakingNewsPage.getInitialProps = async () => {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
  const newsResponse = await response.json();
  const newsArticles = newsResponse.articles || [];

  return {
    newsArticles,
  };
};

export default BreakingNewsPage;
