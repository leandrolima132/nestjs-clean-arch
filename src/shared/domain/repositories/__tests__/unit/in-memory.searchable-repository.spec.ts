import { Entity } from "@/shared/domain/entities/entity"
import { InMemorySearchableRepository } from "../../in-memory.searchable-repository"

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class SubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"]

  protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {

    if(!filter) return items

    return items.filter(item => {
      return item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    })

  }
}

describe("InMemorySearchableRepository unit tests", () => {
  let sut: SubInMemorySearchableRepository

  beforeEach(() => {
    sut = new SubInMemorySearchableRepository()
  })

  describe("applyFilter method", () => {
    it("Should insert a new entity", async () => {})


  })


  describe("applySort method", () => {
  })

  describe("applyPaginate method", () => {
  })

  describe("search method", () => {
  })

})