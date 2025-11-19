import { useState } from "react";
import { usersAPI, type TUser } from "../../../../features/auth/usersAPI"
import { ChangeRole } from "./ChangeRole";

export const Users = () => {

    const { data: usersData, isLoading, error } = usersAPI.useGetUsersQuery()

    // console.log(usersData);
    const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

    return (
        <div>

            <ChangeRole user={selectedUser}/>

            {isLoading && <p>Loading users...</p>}
            {error && <p className="text-red-500">Error fetching users</p>}

            {usersData && usersData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr className="bg-gray-600 text-white text-md lg:text-lg">

                                <th className="px-4 py-2">First Name</th>
                                <th className="px-4 py-2">Last Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Verified</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user: TUser) => (
                                <tr key={user.userid} className="hover:bg-gray-300 border-b border-gray-400">

                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.first_name}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.last_name}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.email}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.role}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                                        <span>
                                            {user.isVerified ? (
                                                <span className="badge-success lg:text-base">Verified</span>
                                            ) : (
                                                <span className="badge-warning lg:text-base">Not Verified</span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                (document.getElementById('role_modal') as HTMLDialogElement)?.showModal();
                                            }}
                                        >
                                            Change Role
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No users found.</p>
            )}


        </div>
    )
}
