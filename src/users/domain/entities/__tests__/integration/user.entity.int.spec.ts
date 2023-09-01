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
        password: "a".repeat(101)
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

  })

})
