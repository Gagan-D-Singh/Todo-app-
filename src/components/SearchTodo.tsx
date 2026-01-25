interface SearchTodoProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchTodo = ({search, setSearch} : SearchTodoProps) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="searchInput">Search Tasks</label>
        <input 
            type="text" 
            id="searchInput" 
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </form>
  )
}

export default SearchTodo
