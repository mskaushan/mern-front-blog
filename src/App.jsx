import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Registration } from "./pages/Registration.jsx";
import { AddPost } from "./pages/AddPost.jsx";
import { MyPosts } from "./pages/MyPosts.jsx";
import { FullPost } from "./pages/FullPost.jsx";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </main>
    </>
  );
}

export default App;