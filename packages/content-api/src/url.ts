export const buildPath = (params: { endpointName: string; scope?: number | string }): string => {
  const { endpointName, scope } = params
  const scopePath = scope !== undefined ? `${scope}` : 'content'
  return `/api/${scopePath}/${endpointName}`
}
