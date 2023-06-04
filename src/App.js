import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Home,
  Public,
  Login,
  Album,
  WeekChart,
  ZingChart,
  Search,
  SearchSongAll,
  SearchSongs,
  SearchArtists,
  SearchPlaylistAlbum,
  Singer,
} from "./Containers/Public";
import { Route, Routes } from "react-router-dom";
import path from "./Utils/path";
import * as actions from "./store/Action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  dispatch(actions.getHome());
  return (
    <>
      <div className="text-white select-none">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.ALBUM_TITLE_PID} element={<Album />} />
            <Route path={path.ZINGCHART_TITLE_PID} element={<WeekChart />} />
            <Route path={path.ZINGCHART} element={<ZingChart />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route
                path={path.SEARCHSONGALL}
                element={<SearchSongAll />}
              ></Route>
              <Route path={path.SEARCHSONG} element={<SearchSongs />}></Route>
              <Route
                path={path.SEARCH_PLAYLIST_ALBUM}
                element={<SearchPlaylistAlbum />}
              ></Route>
              <Route path={path.SEARCH_ARTIST} element={<SearchArtists />}>
                {" "}
              </Route>
            </Route>
            <Route path={path.SINGER} element={<Singer />} />

            <Route path={path.START} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
