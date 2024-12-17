import {UserRole} from './user-role';

export interface UserModel {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
