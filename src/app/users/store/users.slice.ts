import {createSlice} from "@reduxjs/toolkit";
import {UserInfoState} from "../types/user-info-state.type";
import {UserInfoDto} from "../types/user-info-dto.type";
import {getUserInfo, updateUserInfo} from "./users.actions";

const initialState: UserInfoState = {
    userInfo: null,
    pending: {
        userInfo: false,
    },
    errors: {
        userInfo: null
    }
}

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.pending.userInfo = true;
                state.errors.userInfo = null;
            })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.pending.userInfo = false;
                state.userInfo = payload;
            })
            .addCase(getUserInfo.rejected, (state, action: any & { payload: any }) => {
                state.pending.userInfo = false;
                state.errors.userInfo = action.payload.message;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.pending.userInfo = true;
                state.errors.userInfo = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
                state.pending.userInfo = false;
                state.userInfo = payload;
            })
            .addCase(updateUserInfo.rejected, (state, action: any & { payload: any }) => {
                state.pending.userInfo = false;
                state.errors.userInfo = action.payload.message;
            })
    }
});

export default userInfoSlice.reducer;