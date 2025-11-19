import { todosAPI, type TypeTodo } from "../../../../features/todo/todoAPI"
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { UpdateTodo } from "./UpdateTodo";
import { useSelector } from 'react-redux';
import type { RootState } from "../../../../app/store";


export default function UserTodo() {

    const user_id = useSelector((state: RootState) => state.user.user?.userid)

    const [selectedTodo, setSelectedTodo] = useState<TypeTodo | null>(null);

    const { data: todosData, isLoading: todosLoading, error: todoError } = todosAPI.useGetTodosByUserIdQuery(user_id ?? 0, {
        skip: !user_id
    })


    console.log(todosData);
    return (
        <div>
            <UpdateTodo todo={selectedTodo} />


            {todosLoading && <p>Todos loading....</p>}
            {todoError && <p className="text-red-500">Error fetching todos</p>}

            {todosData && todosData.todos && todosData.todos.length > 0 ? (
                <div className="md:overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr className=" bg-gray-600 text-white text-md lg:text-lg">
                                <th className="px-4 py-2">Todo Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Due Date</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>

                            </tr>
                        </thead>
                        <tbody>.
                            {todosData.todos.map((todo: TypeTodo) => (
                                <tr key={todo.todoid} className="hover:bg-gray-300 border-b border-gray-400 " >
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base  ">{todo.todo_name}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base  ">{todo.description}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base  ">{new Date(todo.due_date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base ">
                                        {
                                            todo.isCompleted ? (
                                                <span className=" badge badge-success">Completed</span>
                                            ) :
                                                (
                                                    <span className=" badge badge-warning">Pending</span>
                                                )
                                        }
                                    </td>
                                    <td className="px-4 py-2 flex">
                                        <button className="btn btn-sm btn-primary mr-4"
                                            onClick={() => {
                                                setSelectedTodo(todo);
                                                (document.getElementById('update_modal') as HTMLDialogElement)?.showModal();
                                            }}
                                        >
                                            <FaEdit size={20} />
                                        </button>
                    

                                    </td>


                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            ) : (
                <p>No todos found.</p>

            )
            }


        </div >
    )
}
