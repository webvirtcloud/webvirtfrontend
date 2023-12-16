export const firewallQueries = {
  one: (uuid: string) => ['firewall', uuid],
  list: () => ['firewalls'],
  virtances: (uuid: string) => ['firewall-virtances', uuid],
  virtanceEvent: (id: number) => ['firewall-virtance-event', id],
};
