// redux/apis/activitySlice.js
import { apiSlice } from "./apiSlice";
import { ACTIVITIES_URL } from "../constants";

export const activityApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getActivities: builder.query({
            query: (userId) => ({
                url: `${ACTIVITIES_URL}/allactivities`,
                params: { userId }
            }),
        }),
        addActivity: builder.mutation({
            query: (activity) => ({
                url: `${ACTIVITIES_URL}/add`,
                method: "POST",
                body: activity,
            }),
        }),
        deleteActivity: builder.mutation({
            query: (activityId) => ({
                url: `${ACTIVITIES_URL}/activities/${activityId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetActivitiesQuery, useAddActivityMutation,useDeleteActivityMutation } = activityApiSlice;
