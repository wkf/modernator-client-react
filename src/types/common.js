export function action(type, payload) {
  return { type, payload };
}

export const DASHBOARD = 'dashboard';
export const NEW_SESSION = 'new-session';
export const SESSION = 'session';