import { actionTypes } from "./actionTypes";
import * as apis from '../../Apis'
// import * as apis from '../../Apis' ;

export const setCurSongID = (sid) => {
  return {
    type: actionTypes.SET_CUR_SONG_ID,
    payload: sid,
  };
};

export const isPlaySong = (isPlay) => {
  return {
    type: actionTypes.IS_PLAYING_SONG,
    payload: isPlay,
  };
};

export const setAlbum = (isAlbum) => {
  return {
    type : actionTypes.SET_ALBUM , 
    payload : isAlbum
  }
}

export const setPlaylist = (songs) => {
  return {
    type : actionTypes.SET_PLAYLIST,
    payload : songs
  }
}
export const setCurSongData = (dataSong) => {
  return {
    type : actionTypes.SET_CUR_SONG_DATA ,
    payload : dataSong
  }
}
export const setRecentSong = (dataSong) => {
  return {
    type : actionTypes.SET_RECENT_SONG ,
    payload : dataSong
  }
}
export const removePlaylist = () => {
  return {
    type : actionTypes.REMOVE_PLAYLIST ,
    payload : []
  }
}
export const  removeRecentSongs =()  => {
  return {
    type : actionTypes.REMOVE_RECENT_SONG,
    payload : []
  }
}

export const search =(keywords) => async (dispatch) => {
  try{
    const response = await apis.getSearch(keywords) ;
    console.log()
    if(response.data.err === 0){
      dispatch({
        type : actionTypes.SEARCH,
        payload : response.data.data
      })
    }
    else {
      dispatch({
        type : actionTypes.SEARCH,
        payload : null
      })
    }

  }
  catch(error){
    dispatch({
      type : actionTypes.SEARCH ,
      payload : null
    })
  }
} 

// export const setPlaylist = (pid) => async (dispatch) => {
//   try {
//     const res = await apis.getApiDetailPlaylist(pid)
//     if(res?.data.data.err === 0 ){
//       dispatch({
//         type : actionTypes.SET_PLAYLIST , 
//         payload : res?.data.data.items
//       })
//     }
//   }
//   catch(error) {
//     dispatch({
//       type : actionTypes.SET_PLAYLIST , 
//       payload : []
//     })
//   }
// }
