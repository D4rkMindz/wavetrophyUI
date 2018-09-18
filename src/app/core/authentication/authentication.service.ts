import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Credentials, extract} from '@app/core';
import {Logger} from '../logger.service';
import {environment} from '@env/environment';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

export interface Credentials {
  username: string;
  password: string;
  token?: string;
  userHash?: string;
  expiresAt?: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const log = new Logger('Authentication');

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private readonly _credentialsKey?: string = null;
  private _credentials: Credentials | null;

  constructor(private http: HttpClient, private router: Router) {
    this._credentialsKey = environment.keys.credentials;
    const savedCredentials = sessionStorage.getItem(this._credentialsKey) || localStorage.getItem(this._credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      username: context.username,
      password: context.password,
    };
    return this.http.post<any>('/auth', JSON.stringify(data))
      .pipe(map(res => {
        console.log(res);
        if (res.code === 200) {
          const credentials: Credentials = {
            username: data.username,
            password: data.password,
            userHash: res.user_hash,
            token: res.token,
            expiresAt: res.expires_at,
          };
          this.setCredentials(credentials, context.remember);
          return this.credentials;
        }
        throwError(extract('Login invalid'));
      }));
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    this.router.navigate(['/login']);
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember = true) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(this._credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(this._credentialsKey);
      localStorage.removeItem(this._credentialsKey);
    }
  }

}
