const Header: React.FC = () => {
  return (
    <header className='bg-blue-600 text-white p-8 shadow-md'>
      <div className='container mx-auto text-center'>
        <h1 className='text-4xl font-bold mb-4'>Users project</h1>
        <p className='text-lg'>Bienvenue sur Users Project : explorez les profils GitHub et leurs dépôts en un clic.</p>
      </div>
    </header>
  );
};

export default Header;
