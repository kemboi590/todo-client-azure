import serviceIMG from "../assets/images/services.jpg"

export const Services = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-fit p-4 md:p-8">
            <div className="w-full md:w-1/2 flex items-center mb-6 md:mb-0">
                <img src={serviceIMG} alt="our services" />
            </div>

            {/* /content */}

            <div className="w-full md:w-1/2 flex flex-col gap-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-600"> Our Services</h2>
                <p className="mb-4 text-gray-700 text-base md:text-lg">Discover the range of services TodoPro offers to help your team stay organized and productive. From task management to real-time collaboration, we have you covered!</p>
                <div>
                    {/* daisyui */}
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>Prioritize tasks</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>
                                    <td>Red</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    )
}
