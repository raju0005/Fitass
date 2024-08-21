import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";




export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',

            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/`,
                method: 'POST',
                body: data

            })
        }),
        getProfile: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
            }),

        }),
        addScore: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/score`,
                method: 'PUT',
                body: data
            })
        }),
       
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
            
        })
    })
});



export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGetProfileQuery,
    useUpdateUserMutation, useAddScoreMutation
} = userApiSlice