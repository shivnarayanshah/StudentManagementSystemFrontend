import { mainApi } from "./mainApi.jsx";

const profileApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addProfile: builder.mutation({
      query: ({ token, image }) => ({
        url: "/profile",
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: image,
      }),
      invalidatesTags: ["profile"],
    }),
    getProfile: builder.query({
      query: (token) => ({
        url: "/profile",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: ({ token, image }) => ({
        url: "/profile",
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: image,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useAddProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi;
