import React, { useEffect, useState } from "react";
import { User } from "../types/user";
import { Repo } from "../types/repo";
import UserList from "./lists/UsersList";
import RepositoryList from "./lists/RepositoriesList";

const Main: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.github.com/search/users?q=followers:%3E1000&per_page=10");
        const data = await response.json();
        setUsers(data.items);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        return [];
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRepositories = async () => {
      if (selectedUser) {
        try {
          setIsLoading(true);
          const response = await fetch(selectedUser.repos_url);
          const data = await response.json();
          setRepositories(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Erreur lors de la récupération des dépôts :", error);
          setIsLoading(false);
        }
      }
    };
    fetchRepositories();
  }, [selectedUser]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <main className='flex flex-grow p-4'>
      <UserList users={users} selectedUser={selectedUser} onUserClick={handleUserClick} />
      <RepositoryList selectedUser={selectedUser} repositories={repositories} isLoading={isLoading} />
    </main>
  );
};

export default Main;
