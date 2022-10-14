import './App.css';
import NavBar from './app/components/navbar/navbar';
import BlogList from './app/components/blog-list/blog-list';
import BlogDetails from './app/components/blog-details/blog-details';
import { Route, Routes } from 'react-router-dom';
import BlogForm from './app/components/blog-form/blog-form';
import BlogEditForm from './app/components/blog-form/blog-edit-form';
import { useStore } from './app/stores/store';
import TestErrors from './app/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFoundError from './app/errors/NotFoundError';
import { RouteLinks } from './App-Routes';
import ServerError from './app/errors/ServerError';
import LoginForm from './app/components/users/login-form';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from './app/components/loading/loading';
import ModalContainer from './app/components/modals/modal-container';
import { PrivateRoute } from './app/components/private-route/private-route';


function App() {
  const routeLinks = new RouteLinks();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content={'Loading App...'} />

  return (
    <div className="App">
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <NavBar />
      <Routes>
        <Route path={routeLinks.home} element={<BlogList />} />
          <Route path={routeLinks.blogList} element={<BlogList />} />
        <Route path={routeLinks.blogDetails} element={<BlogDetails />} />
        {/* <Route path={`/read-blog`} element={<BlogDetails />} /> */}

        <Route path={routeLinks.blogForm} element={<PrivateRoute><BlogForm /></PrivateRoute>} />
        <Route path={routeLinks.blogEditForm} element={<BlogEditForm />} />
        <Route path={routeLinks.testErrors} element={<TestErrors />} />
        <Route path={routeLinks.notFound} element={<NotFoundError />} />
        <Route path={routeLinks.serverError} element={<ServerError />} />
        <Route path={routeLinks.login} element={<LoginForm isBackRedirect={true} />} />


      </Routes>
    </div>
  );
}

export default observer(App);

