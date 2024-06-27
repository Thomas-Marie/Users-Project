import React, { useEffect, useState } from "react";
import { User } from "../types/user";
import { Repo } from "../types/repo";

const Main: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.github.com/search/users?q=followers:%3E1000&per_page=10", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
      <section className='w-1/2 p-4'>
        <h2 className='text-xl font-bold mb-4'>Utilisateurs GitHub</h2>
        <ul className='space-y-4'>
          {users.map((user) => (
            <li
              key={user.login}
              onClick={() => handleUserClick(user)}
              className={`p-4 border rounded shadow cursor-pointer hover:bg-gray-100 ${selectedUser?.login === user.login ? "bg-gray-100" : ""}`}>
              <div className='flex items-center space-x-4'>
                <img src={user.avatar_url} alt={`Profil de ${user.login}`} className='w-12 h-12 rounded-full' />
                <span>{user.login}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className='w-1/2 p-4 border-l'>
        {selectedUser ? (
          <div className='p-4 border rounded shadow'>
            <h2 className='text-xl font-bold mb-4'>{selectedUser.login}</h2>
            <img src={selectedUser.avatar_url} alt={selectedUser.login} className='w-24 h-24 rounded-full mb-4' />
            <h3 className='text-lg font-bold mb-2'>Repositories</h3>
            {isLoading ? (
              <p>Chargement des dépôts...</p>
            ) : (
              <ul className='list-disc pl-5 space-y-2'>
                {repositories.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>
                      {repo.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p>Sélectionnez un utilisateur pour voir les détails</p>
        )}
      </section>
    </main>
  );
};

export default Main;
