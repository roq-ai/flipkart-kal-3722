const mapping: Record<string, string> = {
  brokerages: 'brokerage',
  notes: 'note',
  organizations: 'organization',
  positions: 'position',
  transactions: 'transaction',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
