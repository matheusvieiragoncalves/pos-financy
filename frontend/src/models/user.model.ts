export class User {
  id!: string
  name!: string
  email!: string

  createdAt!: Date
  updatedAt!: Date

  constructor(attrs?: Partial<User>) {
    Object.assign(this, attrs)
  }
}
