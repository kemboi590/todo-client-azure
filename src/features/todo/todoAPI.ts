import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";



export type TypeTodo = {
    message: string;
    todoid: number;
    todo_name: string;
    description: string;
    created_at: string;
    due_date: string;
    user_id: number
    isCompleted: boolean
}

export type TypeUserTodo = {
    todos: TypeTodo[]
}

export const todosAPI = createApi({
    reducerPath: 'todosAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        // Prepare header 
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json');
            return headers
        }
    }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        createTodo: builder.mutation<TypeTodo, Partial<TypeTodo>>({
            query: (newTodo) => ({
                url: '/todos',
                method: 'POST',
                body: newTodo
            }),
            invalidatesTags: ['Todos']
        }),
        getTodos: builder.query<{ data: TypeTodo[] }, void>({ //void means no parameters are needed to fetch the todos
            query: () => '/todos',
            providesTags: ['Todos'] // this tells RTK Query that this endpoint provides the Todos tag, so it can be used to invalidate the cache when a new todo is created
        }),
        // delete todo
        deleteTodo: builder.mutation<{ success: boolean, id: number }, number>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos'] // invalidates the cache for the Todos tag when a todo is deleted
        }),
        updateTodo: builder.mutation<TypeTodo, Partial<TypeTodo> & { id: number }>({
            query: (updatedTodo) => ({
                url: `/todos/${updatedTodo.id}`,
                method: 'PUT',
                body: updatedTodo
            }),
            invalidatesTags: ['Todos']

        }),
        getTodosByUserId: builder.query<TypeUserTodo, number>({
            query: (userId) => `users/${userId}/todos`,
            providesTags: ['Todos'] // this tells RTK Query that this endpoint provides the Todos tag, so it can be used to invalidate the cache when a new todo is created
        })
    })
})