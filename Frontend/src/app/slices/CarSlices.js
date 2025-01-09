import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CarApi = createApi({
    reducerPath: 'carApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
        getCars: builder.query({
            query: () => `cars`,
        }),
        deleteCars: builder.mutation({
            query: (id) => ({
                url: `cars/${id}`,
                method: "DELETE"
            })
       
        }),
        addCar: builder.mutation({
            query: (newCar) => ({
                url: "cars",
                method: "POST",
                body: newCar,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }),
        getCarById:builder.query({
            query:(id)=> `cars/${id}`
        }),
    }),
})

export const { useGetCarsQuery, useDeleteCarsMutation, useAddCarMutation, useGetCarByIdQuery } = CarApi