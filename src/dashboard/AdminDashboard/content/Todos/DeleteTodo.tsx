
import { toast } from "sonner"
import { todosAPI, type TypeTodo } from "../../../../features/todo/todoAPI"

type DeleteTodoProps = {
    todo: TypeTodo | null
}

export const DeleteTodo = ({ todo }: DeleteTodoProps) => {

    const [deleteTodo, { isLoading }] = todosAPI.useDeleteTodoMutation()

    const handleDelete = async () => {
        try {
            if (!todo) {
                toast.error("No todo selected for deletion.");
                return;
            }
            await deleteTodo(todo.todoid)
            toast.success("Todo deleted Successfully");
            (document.getElementById('delete_modal') as HTMLDialogElement)?.close();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            toast.error("Failed to delete todo. Please try again.");

        }
    }

    return (
        <dialog id="delete_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">

                <h3 className="font-bold text-lg mb-4">Delete Todo</h3>
                <p className="mb-6">
                    Are you sure you want to delete <span className="font-semibold">{todo?.todo_name}</span>?
                </p>
                <div className="modal-action flex gap-4">
                    <button
                        data-test="delete-todo-confirm-button"
                        className="btn btn-error"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner text-primary" /> Deleting...
                            </>
                        ) : "Yes, Delete"}
                    </button>
                    <button
                        className="btn"
                        type="button"
                        onClick={() => (document.getElementById('delete_modal') as HTMLDialogElement)?.close()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    )
}
