import Login from "../components/Login/Login";
import Main from "../components/Main/Main"
import Movies from "../components/Movies/Movies";
import NotFound from "../components/NotFound/NotFound";
import Profile from "../components/Profile/Profile";
import Register from "../components/Register/Register";
import SavedMovies from "../components/SavedMovies/SavedMovies";

const routes = {
  main: { path: "/", element: <Main /> },
  movies: { path: "/movies", element: <Movies /> },
	savedMovies: { path: "/saved-movies", element: <SavedMovies /> },
	profile: { path: "/profile", element: <Profile /> },
	register: { path: "/sign-up", element: <Register /> },
	login: { path: "/sign-in", element: <Login /> },
	notFound: { path: "/*", element: <NotFound /> },
};

export default routes;