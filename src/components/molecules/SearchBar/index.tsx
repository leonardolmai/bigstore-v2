import { LuSearch } from 'react-icons/lu'

export function SearchBar() {
  return (
    <form className="flex items-center justify-center lg:w-full">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Busque aqui"
        className="max-w-5xl grow rounded-l-md border-b border-l border-t border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
      />
      <button
        type="submit"
        className="rounded-r-md border-b border-r border-t border-primary bg-primary px-2 py-2 text-white shadow-sm hover:bg-primary-dark sm:px-4"
      >
        <LuSearch size={24} />
      </button>
    </form>
  )
}
