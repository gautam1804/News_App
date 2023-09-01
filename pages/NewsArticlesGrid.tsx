import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import NewsArticleEntry from "./NewsArticleEntry";
import styles from "../styles/NewsArticleEntry.module.css";

type NewsArticlesGridProps = {
  articles: INewsArticle[];
};

const NewsArticlesGrid = ({ articles }: NewsArticlesGridProps) => {
  const [favoriteArticles, setFavoriteArticles] = useState<string[]>([]);

  const handleFavoriteToggle = (articleId: string) => {
    console.log('Before:', favoriteArticles);
    
    setFavoriteArticles((prevFavoriteArticles) => {
      if (prevFavoriteArticles.includes(articleId)) {
        return prevFavoriteArticles.filter((id) => id !== articleId);
      } else {
        return [...prevFavoriteArticles, articleId];
      }
    });

    console.log('After:', favoriteArticles);
  };

  const isFavorite = (articleId: string) => {
    return favoriteArticles.includes(articleId);
  };

  return (
    <Row xs={1} sm={2} xl={2} className="g-5">
      {articles.map((article) => (
        <Col key={article.url}>
          <div className={styles.favoriteButtonContainer}>
            <button
              className={styles.favoriteButton}
              onClick={() => handleFavoriteToggle(article.url)}
            >
              <span
                className={`${styles.favoriteIcon} `}
              >
               {isFavorite(article.url) ? "❤️" : "🤍"} 
              </span>
            </button>
          </div>
          <NewsArticleEntry article={article} />
        </Col>
      ))}
    </Row>
  );
};

export default NewsArticlesGrid;
