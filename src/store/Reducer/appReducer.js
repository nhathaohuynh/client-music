import { actionTypes } from "../Action/actionTypes";

const initiaState = {
  banner: [],
  friday: {},
  autoTheme2: {},
  xnone: {},
  top100: {},
  nhacmoi: {},
  newRelease: {},
  weekChart: [],
  chart: {},
  favouriteSinger: {},
  artistSpotlight: [],
};

const appReducer = (state = initiaState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action?.payload?.find((item) => item?.sectionId === "hSlider")
            ?.items || [],
        friday:
          action?.payload?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
        autoTheme2:
          action.payload?.find((item) => item.sectionId === "hEditorTheme2") ||
          {},
        // xnone: action.payload?.find((item) => item.sectionId ==="hNewrelease") || {},
        top100: action.payload?.find((item) => item.sectionId === "h100") || {},
        nhacmoi:
          {
            ...action.payload?.find((item) => item.sectionId === "hAlbum"),
            title: "Nhạc Mới",
          } || {},
        newRelease:
          action.payload?.find((item) => item.sectionType === "new-release") ||
          {},
        weekChart:
          action.payload?.find((item) => item.sectionType === "weekChart")
            .items || {},
        chart: action.payload?.find((item) => item.sectionId === "hZC") || {},
        favouriteSinger:
          action.payload?.find((item) => item.sectionId === "hArtistTheme") ||
          {},
        // artistSpotlight:
        //   action.payload?.find(
        //     (item) => item?.sectionType === "artistSpotlight"
        //   ).items || [],
      };
    default:
      return state;
  }
};
export default appReducer;
