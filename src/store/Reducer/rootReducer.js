import { combineReducers } from "redux";
import appReducer from "./appReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import musicReducer from "./musicReducer";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};
const musicConfig = {
  ...commonConfig,
  key: "music",
  whitelist: ["curSongID", "curSongData", "songs", "recentSong"],
  // blacklist it won't save property of music if you want
};
const bannerConfig = {
  ...commonConfig,
  key: "banner",
  whitelist: ["banner", "newRelease"],
};

const rootReducer = combineReducers({
  app: persistReducer(bannerConfig, appReducer),
  music: persistReducer(musicConfig, musicReducer),
});

export default rootReducer;
