import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI } from "../../features/auth/usersAPI";
import { useEffect } from "react";
import { toast } from "sonner";

type UpdateProfileInputs = {
    first_name: string;
    last_name: string;
    phone_number: string

}

const schema = yup.object({
    first_name: yup.string().max(50, "Max 50 characters").required("First name is required"),
    last_name: yup.string().max(50, "Max 50 characters").required("Last name is required"),
    phone_number: yup.string().max(20, 'Max 20 characters').required('Phone number is required'),
});


interface User {
    userid: number;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
}

interface UpdateUserProps {
    user: User
    refetch?: () => void;
}

export const UpdateUser = ({ user, refetch }: UpdateUserProps) => {
    const [updateUser, { isLoading }] = usersAPI.useUpdateUserProfileMutation()

    const onSubmit: SubmitHandler<UpdateProfileInputs> = async (data) => {
        try {
            const res = await updateUser({ id: user.userid, ...data })
            console.log("User id", user.userid);
            // console.log(res);
            toast.success(res.data?.message);
            if (refetch) {
                refetch()
            }

            (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();


        } catch (error) {
            console.log("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateProfileInputs>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if (user) {
            setValue("first_name", user.first_name || "")
            setValue("last_name", user.last_name || "")
            setValue("phone_number", user.phone_number || "")

        }
    })


    return (
        <dialog id="update_profile_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg mb-4">Update Profile</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        {...register("first_name")}
                        placeholder="First Name"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.first_name && (
                        <span className="text-sm text-red-700">{errors.first_name.message}</span>
                    )}

                    <input
                        type="text"
                        {...register("last_name")}
                        placeholder="Last Name"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.last_name && (
                        <span className="text-sm text-red-700">{errors.last_name.message}</span>
                    )}

                    <input
                        type="text"
                        {...register("phone_number")}
                        placeholder="Phone Number"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"

                    />
                    {
                        errors.phone_number && (
                            <span className="text-red-700 text-sm">{errors.phone_number.message}</span>
                        )
                    }


                    <div className="modal-action flex flex-col sm:flex-row gap-2">
                        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isLoading}>
                            {(isLoading) ? (
                                <>
                                    <span className="loading loading-spinner text-primary" /> Updating...
                                </>
                            ) : "Update"}
                        </button>
                        <button
                            className="btn w-full sm:w-auto"
                            type="button"
                            onClick={() => {
                                (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();
                                reset();
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}
