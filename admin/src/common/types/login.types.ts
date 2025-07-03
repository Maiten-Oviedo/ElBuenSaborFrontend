import { IUser } from './entities/IUser'

export interface ILoginResponse {
  token: string
  user: IUser
  message?: string
}
