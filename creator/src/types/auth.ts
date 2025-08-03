export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  tiktokHandle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthError {
  message: string;
  code?: string;
}
