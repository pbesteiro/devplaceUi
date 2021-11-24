import { AuthenticationService } from "../services/auth.service";

export function appInitializer(authService: AuthenticationService) {
  return () => new Promise((resolve: any) => {
    // attempt to refresh token on app start up to auto authenticate
    authService.refreshToken()
      .subscribe()
      .add(resolve);
  });
}
