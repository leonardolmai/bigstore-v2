export function ProductFilter() {
  return (
    <div className="m-auto mb-4 flex max-w-7xl flex-col justify-end gap-2 rounded-tl-lg rounded-tr-lg bg-slate-200 px-2 py-1 lg:flex-row lg:items-center">
      <label htmlFor="sort" className="mr-2 text-black">
        Ordenar por:
      </label>
      <select
        id="sort"
        className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-dark focus:outline-none focus:ring-primary-dark"
        defaultValue={''}
      >
        <option value="">Selecione</option>
        <option value="priceAsc">Preço: Menor para Maior</option>
        <option value="priceDesc">Preço: Maior para Menor</option>
      </select>
    </div>
  )
}
