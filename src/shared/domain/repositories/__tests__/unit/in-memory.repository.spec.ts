import { Entity } from "@/shared/domain/entities/entity";
import { ImMemoryRepository } from "../../in-memory.repository";
import { NotFoundError } from "@/shared/errors/not-found-error";

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

  it("Should throw error when entity not found", async () => {
    await expect(sut.findById("faker")).rejects.toThrow(new NotFoundError("Entity not found"))
  })


  it("Should find a entity by id", async () => {
    const entity = new StubEntity({name: "value", price: 10})
    await sut.insert(entity)
    const result = await sut.findById(entity._id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it("Should returns all entities", async () => {
    const entity = new StubEntity({name: "value", price: 10})
    await sut.insert(entity)
    const result = await sut.findAll()
    expect([entity]).toStrictEqual(result)
  })

  it("Should throw error on update when entity not found", async () => {
    const entity = new StubEntity({name: "value", price: 10})
    await expect(sut.update(entity)).rejects.toThrow(new NotFoundError("Entity not found"))
  })

  it("Should update an entity", async () => {
    const entity = new StubEntity({name: "value", price: 10})
    await sut.insert(entity)
    const entityUpdated = new StubEntity({name: "updated", price: 1},  entity._id)
    await sut.update(entityUpdated)
    expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it("Should throw error on delete when entity not found", async () => {
    await expect(sut.delete("fakerId")).rejects.toThrow(new NotFoundError("Entity not found"))
  })

  it("Should delete an entity", async () => {
    const entity = new StubEntity({name: "value", price: 10})
    await sut.insert(entity)
    await sut.delete(entity._id)
    expect(sut.items).toHaveLength(0)
  })

})