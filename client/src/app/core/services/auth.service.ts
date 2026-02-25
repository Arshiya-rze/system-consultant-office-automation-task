import { Injectable } from '@angular/core';

type AuthUser = {
  username: string;
};

const LS_TOKEN_KEY = 'demo_token';
const LS_USER_KEY = 'demo_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(username: string, password: string): boolean {
    if (!username?.trim() || !password?.trim()) return false;

    const token = `demo-token-${crypto.randomUUID()}`;
    const user: AuthUser = { username: username.trim() };

    localStorage.setItem(LS_TOKEN_KEY, token);
    localStorage.setItem(LS_USER_KEY, JSON.stringify(user));

    return true;
  }

  logout(): void {
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_USER_KEY);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(LS_TOKEN_KEY);
    return !!token;
  }

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(LS_USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(LS_TOKEN_KEY);
  }
}