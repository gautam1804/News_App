import { Card, ListGroup } from "react-bootstrap";
import NewsArticleEntry from "./NewsArticleEntry";
import React, { useState } from "react";

import styles from "../styles/NewsArticleEntry.module.css";


type NewsArticlesListProps = {
  articles: INewsArticle[];
};

const NewsArticlesList: React.FC<NewsArticlesListProps> = ({ articles }) => {
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
    <ListGroup>
      {articles.map((article, index) => (
<>
<div className={styles.favoriteButtonContainer}>
<button
  className={styles.favoriteButton}
  onClick={() => handleFavoriteToggle(article.url)}
>
  <span className={`${styles.favoriteIcon} `}>
    {isFavorite(article.url) ? "❤️" : "🤍"}
  </span>
</button>
</div>
         <NewsArticleEntry article={article} />
</>
        // <ListGroup.Item key={index}>
        //   <Card>
        //     <Card.Body>
        //       <Card.Title>{article.title}</Card.Title>
        //       <Card.Subtitle className="mb-2 text-muted">
        //         {article.author}
        //       </Card.Subtitle>
        //       <Card.Text>{article.description}</Card.Text>
        //       <Card.Link href={article.url} target="_blank">
        //         Read more
        //       </Card.Link>
        //     </Card.Body>
        //   </Card>
        // </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default NewsArticlesList;
