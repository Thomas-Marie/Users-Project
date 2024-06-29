import React from "react";
import { User as UserType } from "../../types/user";
import User from "./User";

interface UserListProps {
  users: UserType[];
  selectedUser: UserType | null;
  onUserClick: (user: UserType) => void;
}

const UserList: React.FC<UserListProps> = ({ users, selectedUser, onUserClick }) => {
  return (
    <section className='w-1/2 p-4'>
      <h2 className='text-xl font-bold mb-4'>Utilisateurs GitHub</h2>
      <ul className='space-y-4'>
        {users.length > 0 ? (
          users.map((user) => <User key={user.login} user={user} onUserClick={onUserClick} selectedUser={selectedUser} />)
        ) : (
          <li>Chargement des utilisateurs...</li>
        )}
      </ul>
    </section>
  );
};

export default UserList;
