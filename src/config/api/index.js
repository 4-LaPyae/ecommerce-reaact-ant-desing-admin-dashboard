import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "./api-config"

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

// Define and create a common API using Redux Toolkit's `createApi` function
export const commonApi = createApi({
	reducerPath: "commonApi", // A unique reducer path for the common API
	baseQuery, // Use the base query configured with the API settings
	endpoints: (builder) => ({
		getData: builder.query({
			query: (name) => name, // The query function for fetching data
			providesTags: ["getData"], // Define tags for cache invalidation
		}),
		commonApi: builder.mutation({
			query: ({ endpoint, method, body }) => {
				return {
					url: endpoint, // The API endpoint to call
					method: method, // The HTTP method for the request
					body, // The request body, if provided
				}
			},
			invalidatesTags: ["getData"], // Define tags to invalidate when mutation occurs
		}),
	}),
})

// Export generated hooks for using the common API in components
export const { useCommonApiMutation, useGetDataQuery } = commonApi