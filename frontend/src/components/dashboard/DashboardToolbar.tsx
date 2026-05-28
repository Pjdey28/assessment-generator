"use client"

interface Props {
  search: string
  setSearch: any

  filter: string
  setFilter: any
}

export default function DashboardToolbar({
  search,
  setSearch,
  filter,
  setFilter,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center mb-8">
      
      <input
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        placeholder="Search assignments..."
        className="border rounded-2xl px-5 py-3 w-full md:w-[350px]"
      />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(
            e.target.value
          )
        }
        className="border rounded-2xl px-5 py-3"
      >
        <option value="all">
          All
        </option>

        <option value="queued">
          Queued
        </option>

        <option value="processing">
          Processing
        </option>

        <option value="completed">
          Completed
        </option>
      </select>
    </div>
  )
}