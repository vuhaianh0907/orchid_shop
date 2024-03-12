import { apiSlice } from "./apiSlice";
const ACCOUNTS_URL = '/api/accounts';

export const accountsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ACCOUNTS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query:() => ({
                url: `${ACCOUNTS_URL}/logout`,
                method: 'POST',
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${ACCOUNTS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${ACCOUNTS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateMutation} = accountsApiSlice; 