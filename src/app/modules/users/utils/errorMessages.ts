export const USER_MODULE_ERRORS = {
  userNotFoundById: (id: string) => `User with id ${id} does not exists`,
  userNotFoundByEmail: (email: string) => `User with email ${email} does not exists`,
  userNotFoundByUsername: (userName: string) => `User with username ${userName} does not exists`,
  userAlreadyExists: 'User with this email or username already exists',
};
