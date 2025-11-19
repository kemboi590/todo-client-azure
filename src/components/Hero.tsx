
// import { NavLink } from "react-router"
import type { RootState } from "../app/store"
import homeIMG from "../assets/images/home-image.png"
import { useSelector } from "react-redux"

export const Hero = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const firstName = user?.first_name
    const lastName = user?.last_name
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8">
                <div className="w-full md:w-1/2 border-2 border-gray-300 rounded-lg text-gray-600 p-6 md:p-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600 ">
                        {
                            firstName ? (
                                <span>Welcome {firstName} {lastName}</span>
                            ) : <span> Welcome to TodoPro!</span>
                        }

                    </h1>
                    <p className="mb-4 text-gray-700 text-base md:text-lg">Supercharge your team's productivity with TodoPro — the ultimate task management service for modern teams.</p>
                    <p className="mb-4 text-gray-700 text-base md:text-lg">Effortlessly assign tasks, track progress, and collaborate in real-time. Whether you're managing a small project or a large team, TodoPro makes delegation and follow-up a breeze.</p>
                    <p className="mb-4 text-gray-700 text-base md:text-lg">
                        Get started today and experience seamless teamwork like never before!
                    </p>
                </div>


                <div className="w-full md:w-1/2 items-center">
                    <img src={homeIMG} alt="home-image" />

                </div>
                {/* <NavLink to="https://www.google.com/">Vist Google</NavLink>
                <a href="https://www.google.com/">Vist Google</a> */}


            </div>
        </>
    )
}
