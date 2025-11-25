import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { todosAPI } from "../../../../features/todo/todoAPI";
import { toast } from "sonner";

export type CreateTodo = {
    todo_name: string;
    description: string;
    due_date: string;
    user_id: number
    isCompleted: boolean
}

const schema = yup.object({
    todo_name: yup.string().max(75, "Max 75 characters").required("Todo name is required"),
    description: yup.string().max(255, "Max 255 characters").required("Description is required"),
    user_id: yup.number().required("User ID is required").positive("User ID must be a positive number").integer("User ID must be an integer"),
    isCompleted: yup.boolean().default(false),
    due_date: yup.string().required("Due date is required"),
});



export const CreateTodo = () => {
    const [createTodo, { isLoading }] = todosAPI.useCreateTodoMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTodo>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<CreateTodo> = async (data) => {
        try {
            const response = await createTodo(data).unwrap()
            console.log(response.message);
            toast.success(response.message);
                (document.getElementById('create-todo') as HTMLDialogElement)?.close()
        } catch (error) {
            console.error("Error creating todo:", error);
            toast.error("Failed to create todo. Please try again.");
        }
    }


    return (
        <dialog id="create-todo" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" >
                    <input
                        data-test="todo-name-input"
                        type="text"
                        {...register("todo_name")}
                        placeholder="Todo Name"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"

                    />
                    {errors.todo_name && (
                        <span className="text-sm text-red-700">{errors.todo_name.message}</span>
                    )}

                    <textarea
                        data-test="todo-description-input"
                        {...register("description")}
                        placeholder="Description"
                        className="textarea textarea-bordered w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.description && (
                        <span className="text-sm text-red-700">{errors.description.message}</span>
                    )}

                    <input
                        data-test="todo-userid-input"
                        type="number"
                        {...register("user_id")}
                        placeholder="User ID"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />

                    {errors.user_id && (
                        <span className="text-sm text-red-700">{errors.user_id.message}</span>
                    )}

                    <input
                        data-test="todo-date-input"
                        type="date"
                        {...register("due_date")}
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.due_date && (
                        <span className="text-sm text-red-700">{errors.due_date.message}</span>
                    )}

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-4 text-white ">Status</span>
                            <div>
                                <label >

                                    <input data-test="todo-status-completed" type="radio" value="true"
                                        {...register("isCompleted")}
                                        className="radio radio-success"
                                    /> Completed
                                </label>
                                <label >
                                    <input data-test="todo-status-pending" type="radio" value="false"
                                        {...register("isCompleted")}
                                        className="radio radio-warning" defaultChecked /> Pending
                                </label>
                            </div>
                        </label>

                    </div>

                    <div className="modal-action">

                        <button data-test="createtodo-submit-button"
                            type="submit" className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner text-primary" /> Creating...
                                </>
                            ) : "Create"}
                        </button>

                        <button className="btn" type="button" onClick={() => {
                            (document.getElementById('create-todo') as HTMLDialogElement)?.close()
                        }}>
                            Close

                        </button>
                    </div>
                </form>

            </div>
        </dialog>
    )
}
