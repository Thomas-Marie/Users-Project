import { User as UserType } from "../../types/user";

interface UserProps {
  user: UserType;
  onUserClick: (user: UserType) => void;
  selectedUser: UserType | null;
}

const User: React.FC<UserProps> = ({ user, onUserClick, selectedUser }) => {
  return (
    <li
      onClick={() => onUserClick(user)}
      className={`p-4 border rounded shadow cursor-pointer hover:bg-gray-100 ${selectedUser?.login === user.login ? "bg-gray-100" : ""}`}>
      <div className='flex items-center space-x-4'>
        <img src={user.avatar_url} alt={`Profil de ${user.login}`} className='w-12 h-12 rounded-full' />
        <span>{user.login}</span>
      </div>
    </li>
  );
};

export default User;
