export function Pagination() {
  return (
    <div className="mt-4 flex justify-center">
      <nav className="flex space-x-2">
        <a
          href="#"
          className="rounded-md bg-primary px-2 py-1 text-white hover:bg-primary-dark sm:px-3"
        >
          Anterior
        </a>
        <a
          href="#"
          className="rounded-md bg-primary px-2 py-1 text-white hover:bg-primary-dark sm:px-3"
        >
          1
        </a>
        <a
          href="#"
          className="rounded-md bg-primary px-2 py-1 text-white hover:bg-primary-dark sm:px-3"
        >
          2
        </a>
        <a
          href="#"
          className="rounded-md bg-primary px-2 py-1 text-white hover:bg-primary-dark sm:px-3"
        >
          3
        </a>
        <a
          href="#"
          className="rounded-md bg-primary px-2 py-1 text-white hover:bg-primary-dark sm:px-3"
        >
          Próximo
        </a>
      </nav>
    </div>
  )
}
