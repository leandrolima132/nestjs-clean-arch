import { InMemorySearchableRepository } from "@/shared/domain/repositories/in-memory.searchable-repository";
import { ConflictError } from "@/shared/errors/conflict-error";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositories/user.repository";

 export class UserInMemoryRepository extends InMemorySearchableRepository<UserEntity> implements UserRepository.Repository {

  sortableFields: string[] = ["name", "createdAt"];

   protected async applyFilter(items: UserEntity[], filter: UserRepository.Filter): Promise<UserEntity[]> {
    if(!filter) {
      return items
    }

    return items.filter(item => {
      return item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    })
   }

    protected async applySort(items: UserEntity[], sort: string | null, sortDir: string | null): Promise<UserEntity[]> {
      return !sort ? super.applySort(items, 'createdAt', 'desc') : super.applySort(items, sort, sortDir)
   }

   async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)

    if (!entity) {
      throw new NotFoundError(`Entity not found using email: ${email}`)
   }
   return entity
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictError("Email address already used")
    }
   }
}