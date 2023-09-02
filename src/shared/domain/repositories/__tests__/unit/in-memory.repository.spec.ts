import { Entity } from "@/shared/domain/entities/entity";
import { ImMemoryRepository } from "../../in-memory.repository";

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class SubInMemoryRepository extends ImMemoryRepository<StubEntity> {}

describe("ImMemoryRepository unit tests", () => {
  let sut: SubInMemoryRepository

  beforeEach(() => {
    sut = new SubInMemoryRepository()
  })

  it("Should insert a new entity", async () => {
    const entity = new StubEntity({name: "value", price: 10})
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it("Should findById a new entity", () => {})

  it("Should findAll a new entity", () => {})

  it("Should update a new entity", () => {})

  it("Should delete a new entity", () => {})


})