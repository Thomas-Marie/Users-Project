import React from "react";
import { Repo } from "../../types/repo";
import { User } from "../../types/user";

interface RepositoryListProps {
  selectedUser: User | null;
  repositories: Repo[];
  isLoading: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ selectedUser, repositories, isLoading }) => {
  return (
    <section className='w-1/2 p-4 border-l'>
      {selectedUser ? (
        <div className='p-4 border rounded shadow'>
          <h2 className='text-xl font-bold mb-4'>{selectedUser.login}</h2>
          <img src={selectedUser.avatar_url} alt={selectedUser.login} className='w-24 h-24 rounded-full mb-4' />
          <h3 className='text-lg mb-2 pb-4'>Dépôts</h3>
          {isLoading ? (
            <p>Chargement des dépôts...</p>
          ) : (
            <ul className='list-none pl-5 grid grid-cols-2 gap-6 mt-4'>
              {repositories.map((repo) => (
                <li key={repo.id} className='mb-4'>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-4 border rounded shadow cursor-pointer hover:bg-gray-100 text-blue-500'>
                    {repo.name.length > 20 ? `${repo.name.substring(0, 20)}...` : repo.name}
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
  );
};

export default RepositoryList;
