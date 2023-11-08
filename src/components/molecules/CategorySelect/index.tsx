export function CategorySelect() {
  return (
    <select
      id="category"
      name="category"
      className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-dark focus:outline-none focus:ring-primary-dark"
      defaultValue={''}
    >
      <option value="" disabled>
        Categorias
      </option>
      <option value="electronics">Eletrônicos</option>
      <option value="clothing">Vestuário</option>
      <option value="home">Casa</option>
      <option value="health_beauty">Saúde e Beleza</option>
      <option value="sports_outdoors">Esportes e Ar Livre</option>
      <option value="books_movies_music">Livros, Filmes e Música</option>
      <option value="toys_games">Brinquedos e Jogos</option>
      <option value="automotive">Automotivo</option>
      <option value="furniture_home_decor">Móveis e Decoração</option>
      <option value="office_supplies">Material de Escritório</option>
    </select>
  )
}
