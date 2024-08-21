import { apiSlice } from "./apiSlice";
import { LB_URL } from "../constants";
import { createSlice } from "@reduxjs/toolkit";

export const lbSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLeaderboard: builder.query({
            query: () => ({
                url: `${LB_URL}/`,
            }),
        })
    })
})

export const{useGetLeaderboardQuery}=lbSlice