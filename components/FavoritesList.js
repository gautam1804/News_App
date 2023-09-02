import React from 'react';
import Link from 'next/link';
import NewsArticleEntry from '../pages/NewsArticleEntry';
import styles from '../styles/Favourites.module.css';

const FavouritesList = ({ favourites }) => {
  if (!favourites || favourites.length === 0) {
    return (
      <div className={styles['favourites-title']}>
        <p>No favourite articles yet.</p>
        
        <Link href="/NewsArticleEntryPage">
          <button className={styles['discover-button2']}>Discover Latest News</button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles['favourites-container']}>
      <h2 className={styles['favourites-title']}>Your Favourite Articles</h2>
      <ul>
        {favourites.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
      <div>
        <h2>Discover Latest News</h2>
        {favourites.map((article) => (
          <NewsArticleEntry key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default FavouritesList;
