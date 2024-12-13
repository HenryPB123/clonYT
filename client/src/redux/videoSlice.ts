import { createSlice } from "@reduxjs/toolkit";

export interface VideoState {
  currentVideo:
    | {
        _id: string;
        userId: string;
        title: string;
        description: string;
        imgUrl: string;
        videoUrl: string;
        views: number;
        tags: string[];
        likes: string[];
        dislikes: string[];
        createdAt: string;
      }
    | null
    | unknown;
  loading: boolean;
  error: boolean;
}

const initialState: VideoState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state: VideoState) => {
      state.loading = true;
    },
    fetchSuccess: (state: VideoState, action: { payload: unknown }) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state: VideoState) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = videoSlice.actions;

export default videoSlice.reducer;
