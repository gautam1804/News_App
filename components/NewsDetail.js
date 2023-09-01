import React from "react";
import { Card, Button } from "react-bootstrap";

const NewsDetail = ({ article }) => {
  return (
    <div>
      <Card>
        <Card.Img variant="top" src={article.urlToImage} alt="Article" />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
          <Button variant="primary" href={article.url} target="_blank">
            Read Full Article
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsDetail;
