import React from 'react';
import { Article } from '../components/Article.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);
  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <section className='posts'>
      {isPostsLoading ? null : posts.items.map((obj, index) => (
        <Article key={index} id={obj._id} title={obj.title} imageUrl={obj.imageUrl} user={obj.user.fullName} createdAt={`${new Date(obj.createdAt).getDate()}.${new Date(obj.createdAt).getMonth() + 1}.${new Date(obj.createdAt).getFullYear()}`}/>
      ))}
    </section>
  );
};