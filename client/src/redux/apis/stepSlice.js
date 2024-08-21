import { apiSlice } from "./apiSlice";
import { STEPS_URL } from "../constants";

export const stepApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        totalsteps: builder.mutation({
            query: (data) => ({
                url: `${STEPS_URL}/totalsteps`,
                method: 'POST',
                body: data
            })
        }),
        addsteps: builder.mutation({
            query: (data) => ({
                url: `${STEPS_URL}/addsteps`,
                method: 'POST',
                body: data
            })
        }),
        getTotalsteps: builder.query({
            query: (id) => ({
                url: `${STEPS_URL}/${id}`,
               
            })
        })
    })
});

export const { useTotalstepsMutation , useGetTotalstepsQuery ,useAddstepsMutation} = stepApiSlice;

