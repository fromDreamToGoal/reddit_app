import React from 'react';
import './CommentSkeleton.css';

const CommentSkeleton = () => (
  <div className="comment-skeleton" data-testid="comment-skeleton">
    <div className="skeleton author-skeleton"></div>
    <div className="skeleton body-skeleton"></div>
    <div className="skeleton date-skeleton"></div>
  </div>
);

export default CommentSkeleton;