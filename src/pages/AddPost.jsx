import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate, Link, useParams } from "react-router-dom";
import { selectIsAuth } from "../redux/slices/auth";
import SimpleMDE from 'react-simplemde-editor';
import axios from "../axios";

import 'easymde/dist/easymde.min.css';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };
  const onClickRemoveImage = () => setImageUrl('');

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        text,
      }

      const { data } = isEditing 
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании статьи');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageUrl);
      }).catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
    }
  }, [])

  const options = React.useMemo(() => ({
      spellChecker: false,
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 1,
      },
  }),[]);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <section className="editor">
      <input className="editor__title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок статьи" />
      <input className="editor__downloadImgInput" type="file" id="file-input" onChange={handleChangeFile} />
      {imageUrl ? (
        <>
          <img className="editor__img" src={process.env.REACT_APP_API_URL} alt="Uploaded" />
          <button className="editor__deleteImg" onClick={onClickRemoveImage}>Удалить фото</button>
        </>
      ) : <label className="editor__downloadImgLabel" htmlFor="file-input" title="Добавить фото"><i className="fa-regular fa-image"></i></label>}
      <SimpleMDE className="editor__text" value={text} onChange={onChange} options={options} />
      <div className="editor__buttons">
        <button className="editor__added" onClick={onSubmit}>{isEditing ? 'Сохранить' : 'Опубликовать'}</button>
        <Link className="editor__cancel" to="/">Отмена</Link>
      </div>
    </section>
  );
};
