import Navbar from "../nav/Navbar"
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; //validator
import { loginAPI } from "../../features/auth/loginAPI";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/userSlice";
import { useNavigate } from "react-router";

type LoginInputs = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').max(20, 'Max 20 characters').required('Password is required'),
});
export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            const response = await loginUser(data).unwrap()
            // console.log(response);
            toast.success(response.message)
            // dispatch- store user info
            dispatch(loginSuccess(response))

            if (response.user.role === 'admin') {
                navigate('/admin/dashboard/todos')
            } else if (response.user.role === 'user') {
                navigate('/user/dashboard/todos')
            }



            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // console.log(error.data.error);
            toast.error(error.data.error)

        }
    }


    return (
        <>
            <Navbar />


            <div className="flex justify-center items-center min-h-screen bg-base-200 ">
                <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
                    <h1 className="text-3xl font-bold mb-6 text-center" data-test="todo-login-header">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-test="login-form">
                        <input
                            data-test="login-email-input"
                            type="email"
                            {...register("email")}
                            placeholder="Email"
                            className="input border border-gray-300 rounded w-full p-2 text-lg"

                        />
                        {errors.email && (
                            <span className="text-sm  text-red-700">{errors.email.message}</span>
                        )}

                        <input
                            data-test="login-password-input"
                            type="password"
                            {...register("password")}
                            placeholder="Password"
                            className="input border border-gray-300 rounded w-full p-2 text-lg"

                        />
                        {errors.password && (
                            <span className="text-sm text-red-700">{errors.password.message}</span>
                        )}


                        {/* <button type="submit" className="btn btn-primary w-full mt-4">Login</button> */}

                        <button data-test="login-submit-button" type="submit" className="btn btn-primary w-full mt-4" disabled={isLoading}  >
                            {
                                isLoading ? (
                                    <>
                                        <span className="loading loading-spinner text-primary" /> Please wait...
                                    </>
                                ) : "Login"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
