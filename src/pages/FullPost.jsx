import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { fetchRemovePost } from '../redux/slices/posts';

export const FullPost = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка получения статьи');
      })
  }, []);

  if (isLoading) {
    return <div>Загрузка</div>;
  }

  const onClickRemove = async () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      await dispatch(fetchRemovePost(id));
      navigate('/my-posts');
    }
  };
  
  return (
    <section className="post">
      {data.imageUrl ? <img className='post__img' src={`${process.env.REACT_APP_API_URL}${data.imageUrl}`} alt="holder" /> : null}
      <h2 className='post__title'>{data.title}</h2>
      <Markdown className="post__text" children={data.text} />
      <div className='post__wrapperTop'>
        <div className='post__author'>{data.user.fullName}</div>
        <div className='post__date'>{`${new Date(data.createdAt).getDate()}.${new Date(data.createdAt).getMonth() + 1}.${new Date(data.createdAt).getFullYear()}`}</div>
      </div>
      <div className='post__wrapperBottom'>
        <div className='post__views'><i className="fa-regular fa-eye"></i> {data.viewsCount}</div>
        {userData?._id === data.user._id ? <div className="post__buttons">
        <Link className="post__edit" to={`/posts/${id}/edit`} title="Редактировать статью"><i className="fa-solid fa-pen"></i></Link>
        <button className="post__delete" onClick={onClickRemove} title="Удалить статью"><i className="fa-solid fa-trash-can"></i></button>
        </div> : null}
      </div>
    </section>
  );
};
