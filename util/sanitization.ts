export function getSafeReturnToPath(path: string | string[] | undefined) {
  if (
    typeof path !== 'string' ||
    !path ||
    path.startsWith('/logout') ||
    !/^\/[\d#/=?a-z-]+$/.test(path)
  ) {
    return undefined;
  }

  return path;
}
