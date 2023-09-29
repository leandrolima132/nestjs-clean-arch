import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserInMemoryRepository } from "../user-in-memory.repository"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { NotFoundError } from "@/shared/errors/not-found-error"
import { ConflictError } from "@/shared/errors/conflict-error"

describe("UserImMemoryRepository unit tests", () => {
  let sut: UserInMemoryRepository

  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })

  describe("findByEmail method", () => {
    it("Should throw error when not found", async () => {
      await expect(sut.findByEmail("test@test.com")).rejects.toThrow(new NotFoundError("Entity not found using email: test@test.com"))
     })


     it("Should find a entity by email", async () => {
       const entity = new UserEntity(UserDataBuilder({}))
       await sut.insert(entity)
       const result = await sut.findByEmail(entity.email)
       await expect(entity.toJSON()).toStrictEqual(result.toJSON())
      })
  })



    describe("emailExists method", () => {
      it("Should throw error when not found", async () => {
        const entity = new UserEntity(UserDataBuilder({}))
        await sut.insert(entity)
        await expect(sut.emailExists(entity.email)).rejects.toThrow(new ConflictError("Email address already used"))
      })

      it("Should find a entity by email", async () => {
        expect.assertions(0)
        await sut.emailExists("test@test.com")
      })
    })



    describe("applyFilter method", () => {
      it("Should no filter items when filter object is null", async () => {
        const entity = new UserEntity(UserDataBuilder({}))
        await sut.insert(entity)
        const result = await sut.findAll()
        const spyFilter = jest.spyOn(result, "filter")
        const itemsFiltered = await sut['applyFilter'](result, null)
        expect(spyFilter).not.toHaveBeenCalled()
        await expect(itemsFiltered).toStrictEqual(result)
       })


       it("Should filter name field using filter param", async () => {
        const items = [
          new UserEntity(UserDataBuilder({name: "Test"})),
          new UserEntity(UserDataBuilder({name: "TEST"})),
          new UserEntity(UserDataBuilder({name: "faker"}))
        ]
        const spyFilter = jest.spyOn(items, "filter")
        const itemsFiltered = await sut['applyFilter'](items, 'TEST')
        expect(spyFilter).toHaveBeenCalled()
        await expect(itemsFiltered).toStrictEqual([items[0], items[1]])
       })
    })


})