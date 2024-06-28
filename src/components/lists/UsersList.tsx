import React from "react";
import { User } from "../../types/user";

interface UserListProps {
  users: User[];
  selectedUser: User | null;
  onUserClick: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, selectedUser, onUserClick }) => {
  return (
    <section className='w-1/2 p-4'>
      <h2 className='text-xl font-bold mb-4'>Utilisateurs GitHub</h2>
      <ul className='space-y-4'>
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.login}
              onClick={() => onUserClick(user)}
              className={`p-4 border rounded shadow cursor-pointer hover:bg-gray-100 ${selectedUser?.login === user.login ? "bg-gray-100" : ""}`}>
              <div className='flex items-center space-x-4'>
                <img src={user.avatar_url} alt={`Profil de ${user.login}`} className='w-12 h-12 rounded-full' />
                <span>{user.login}</span>
              </div>
            </li>
          ))
        ) : (
          <li>Chargement des utilisateurs...</li>
        )}
      </ul>
    </section>
  );
};

export default UserList;
