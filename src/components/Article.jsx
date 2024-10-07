import React from 'react';
import { Link } from 'react-router-dom';

export const Article = ({ id, title, imageUrl, user, createdAt }) => {
    return (
        <Link className='article' to={`/posts/${id}`}>
            {imageUrl ? <img className='article__img' src={process.env.REACT_APP_API_URL} alt="holder" /> : null}
            <h2 className='article__title'>{title}</h2>
            <div className='article__wrapper'>
                <div className='article__author'>{user}</div>
                <div className='article__date'>{createdAt}</div>
            </div>
        </Link>
    )
};