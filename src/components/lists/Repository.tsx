import { Repo } from "../../types/repo";

interface RepositoryProps {
  repo: Repo;
}

const Repository: React.FC<RepositoryProps> = ({ repo }) => {
  return (
    <li className='mb-4'>
      <a
        href={repo.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className='p-4 border rounded shadow cursor-pointer hover:bg-gray-100 text-blue-500'>
        {repo.name.length > 20 ? `${repo.name.substring(0, 20)}...` : repo.name}
      </a>
    </li>
  );
};

export default Repository;
