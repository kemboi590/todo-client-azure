import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import type { TypeTodo } from "../../../../features/todo/todoAPI";
import { todosAPI } from "../../../../features/todo/todoAPI";
import { toast } from "sonner";

type UpdateTodoProps = {
    todo: TypeTodo | null; //can be null if no todo is selected
};

type UpdateTodoInputs = {
    todo_name: string;
    description: string;
    due_date: string;
    user_id: number
    isCompleted: boolean
};

const schema = yup.object({
    todo_name: yup.string().max(75, "Max 75 characters").required("Todo name is required"),
    description: yup.string().max(255, "Max 255 characters").required("Description is required"),
    user_id: yup.number().required("User ID is required").positive("User ID must be a positive number").integer("User ID must be an integer"),
    isCompleted: yup.boolean().default(false),
    due_date: yup.string().required("Due date is required"),
});


export const UpdateTodo = ({ todo }: UpdateTodoProps) => {
    const [updateTodo, { isLoading }] = todosAPI.useUpdateTodoMutation()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateTodoInputs>({
        resolver: yupResolver(schema),
    });

    // popilate the form with the data to update
    useEffect(() => {
        if (todo) {
            setValue("todo_name", todo.todo_name)
            setValue("description", todo.description)
            setValue("user_id", todo.user_id)
            setValue("due_date", todo.due_date.slice(0, 10))
            setValue("isCompleted", todo.isCompleted)

        } else {
            reset()
        }

    }, [todo, setValue, reset])


    const onSubmit: SubmitHandler<UpdateTodoInputs> = async (data) => {
        console.log(data);
        try {
            if (!todo) {
                toast.error("No todo selected for update.");
                return;
            }

            const res = await updateTodo({ ...data, id: todo.todoid })
            // console.log(res.data?.message);
            toast(res.data?.message);
            (document.getElementById('update_modal') as HTMLDialogElement)?.close();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            toast.error("Failed to update todo. Please try again.");

        }
    }
    return (
        <dialog id="update_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">

                <h3 className="font-bold text-lg mb-4">Update Todo</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        data-test="edit-todo-name-input"
                        type="text"
                        {...register("todo_name")}
                        placeholder="Todo Name"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.todo_name && (
                        <span className="text-sm text-red-700">{errors.todo_name.message}</span>
                    )}

                    <textarea
                        data-test="edit-todo-description-input"
                        {...register("description")}
                        placeholder="Description"
                        className="textarea textarea-bordered w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.description && (
                        <span className="text-sm text-red-700">{errors.description.message}</span>
                    )}

                    <input
                        data-test="edit-todo-userid-input"
                        type="number"
                        {...register("user_id")}
                        placeholder="User ID"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.user_id && (
                        <span className="text-sm text-red-700">{errors.user_id.message}</span>
                    )}

                    <input
                        data-test="edit-todo-date-input"
                        type="date"
                        {...register("due_date")}
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.due_date && (
                        <span className="text-sm text-red-700">{errors.due_date.message}</span>
                    )}

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-4 text-white">Status</span>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        data-test="edit-todo-status-completed"
                                        type="radio"
                                        value="true"
                                        {...register("isCompleted")}
                                        className="radio radio-primary text-green-400"
                                    />
                                    Completed
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        data-test="edit-todo-status-pending"
                                        type="radio"
                                        value="false"
                                        {...register("isCompleted")}
                                        className="radio radio-primary text-yellow-400"
                                    />
                                    Pending
                                </label>
                            </div>
                        </label>
                    </div>
                    {errors.isCompleted && (
                        <span className="text-sm text-red-700">{errors.isCompleted.message}</span>
                    )}

                    <div className="modal-action">
                        <button
                            data-test="update-todo-button"
                            type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner text-primary" /> Updating...
                                </>
                            ) : "Update"}
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                (document.getElementById('update_modal') as HTMLDialogElement)?.close();
                                reset();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div >
        </dialog >
    )
}
