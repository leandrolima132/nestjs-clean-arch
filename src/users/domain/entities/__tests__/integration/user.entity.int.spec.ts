import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserEntity, UserProps } from "../../user.entity"
import { EntityValidationError } from "@/shared/errors/validation-error"

describe("UserEntity integration tests", () => {
  describe("Construct method", () => {
    it("Should throw an error when creating a user with invalid name", () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: ""
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 10 as any
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: "a".repeat(256)
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it("Should throw an error when creating a user with invalid password", () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: ""
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: 10 as any
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: "a".repeat(101)
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it("Should throw an error when creating a user with invalid createdAt", () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: "2023" as unknown as Date
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        createdAt: 10 as any
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it("Should a valid user", () => {
      expect.assertions(0)
      let props: UserProps = {
        ...UserDataBuilder({}),
      }
      new UserEntity(props)
    })
  })

  describe("Update method", () => {

    it("should throw an error when update a use with invalid name", () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.updateName(null)).toThrowError(EntityValidationError)
      expect(() => entity.updateName("")).toThrowError(EntityValidationError)
      expect(() => entity.updateName(10 as any)).toThrowError(EntityValidationError)
      expect(() => entity.updateName("a".repeat(256))).toThrowError(EntityValidationError)
    })

    it("Should a valid user", () => {
      expect.assertions(0)
      let props: UserProps = {
        ...UserDataBuilder({}),
      }
     const entity = new UserEntity(props)
     entity.updateName("other name")
     entity.updatePassword("other password")
    })
    
    it("should a invalid user using password field", () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.updatePassword(null)).toThrowError(EntityValidationError)
      expect(() => entity.updatePassword("")).toThrowError(EntityValidationError)
      expect(() => entity.updatePassword(10 as any)).toThrowError(EntityValidationError)
      expect(() => entity.updatePassword("a".repeat(101))).toThrowError(EntityValidationError)
    })
  })
})
