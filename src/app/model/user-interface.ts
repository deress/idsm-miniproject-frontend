export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UsersListResponse {
  success: boolean;
  message: string;
  data: User[];
}
