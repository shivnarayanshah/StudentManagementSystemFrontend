import { mainApi } from "./mainApi.jsx";

export const studentApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: ({ token, data }) => ({
        url: "/students",
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: data,
      }),
      invalidatesTags: ["students"],
    }),

    getAllStudents: builder.query({
      query: (token) => ({
        url: "/students",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["students"],
    }),
    getPaginatedStudents: builder.query({
      query: ({ token, page, limit, search }) => ({
        url: `/students/paginated?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["students"],
    }),
    getSingleStudent: builder.query({
      query: ({ token, id }) => ({
        url: `/students/${id}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["students"],
    }),

    updateStudent: builder.mutation({
      query: ({ token, id, data }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["students"],
    }),
    deleteStudent: builder.mutation({
      query: ({ token, id, data }) => ({
        url: `/students/${id}`,
        method: "DELETE",
        body: {
          data,
        },
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["students"],
    }),
    getStudentByEmail: builder.query({
      query: ({ email, token }) => ({
        url: `/students/email/${email}1`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useGetPaginatedStudentsQuery,
  useGetStudentByEmailQuery,
} = studentApi;
