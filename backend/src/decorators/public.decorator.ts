const publicFields = new Set<string>();

/**
 * Decorator para marcar métodos (query/mutation) como públicos, ignorando a autenticação.
 * @returns MethodDecorator que marca o método como público.
 * @example
 *
 * @Public()
 * @Mutation(() => UserModel)
 * async userCreate(
 *   @Arg('data', () => CreateUserInput) data: CreateUserInput
 * ): Promise<UserModel> {
 *   return this.userService.create(data);
 * }
 *
 */
export function Public(): MethodDecorator {
  return (_target, propertyKey) => {
    publicFields.add(propertyKey.toString());
  };
}

/**
 * Função auxiliar para verificar se um campo (query/mutation) é público - Usada no middleware de autenticação.
 */
export function isPublicField(fieldName: string): boolean {
  return publicFields.has(fieldName);
}
