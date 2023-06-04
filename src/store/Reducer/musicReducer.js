import { actionTypes } from "../Action/actionTypes";

const initiaState = {
  curSongID: null,
  curSongData: {},
  isPlaySong: false,
  songs: [],
  nextSongs: [],
  recentSong: [],
  search: {},

};

const musicReducer = (state = initiaState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongID: action.payload || null,
      };
    case actionTypes.IS_PLAYING_SONG:
      return {
        ...state,
        isPlaySong: action.payload,
      };
    case actionTypes.SET_ALBUM:
      return {
        ...state,
        isAlbum: action.payload,
      };
    case actionTypes.SET_PLAYLIST:
      return {
        ...state,
        songs: action.payload || [],
        nextSongs: action.payload || [],
      };
    case actionTypes.SET_CUR_SONG_DATA: {
      return {
        ...state,
        curSongData: action.payload || {},
      };
    }
    case actionTypes.SET_RECENT_SONG: {
      let newSongs;

      const songs = state.recentSong;
      if (action.payload) {
        if (songs.length > 20) {
          newSongs = [
            action.payload,
            ...songs.filter((song, index) => index < 20),
          ];
        } else {
          newSongs = [action.payload, ...state.recentSong];
        }
      }
      return {
        ...state,
        recentSong: [...new Set(newSongs)] || state.recentSong,
      };
      //
    }
    case actionTypes.REMOVE_PLAYLIST: {
      return {
        ...state,
        nextSongs: action.payload,
      };
    }

    case actionTypes.REMOVE_RECENT_SONG: {
      return {
        ...state,
        recentSong: action.payload,
      };
    }
    case actionTypes.SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }
    default:
      return state;
  }
};
export default musicReducer;
