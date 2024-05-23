import apiSlice from "./apiSlice"

const videoApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllVideos: build.query({
            query: () => ({
                url: '/api/lessonVideo'
            })
        }),
        getPathById: build.query({
            query: (id) => ({
                url: '/api/lessonVideo/'+id,
            })
        }),
        getVideoByRole: build.mutation({
            query: (role) => ({
                url: '/api/lessonVideo/role/',
                url: '/upload',
                method:"POST",
                body:role
            })
        }),
        getVideoByName: build.mutation({
            query: (fileName) => ({
                url: '/upload',
                method:"POST",
                body:fileName
            })
        }),
        createLessonVideo: build.mutation({
            query: (data) => ({
                url: '/api/lessonVideo',
                method:"POST",
                body:data
            })
        }),
     }),
})
export const {  useGetAllVideosQuery,useGetPathByIdQuery,useCreateLessonVideoMutation,useGetVideoByRoleMutation,useGetVideoByNameMutation } = videoApiSlice