export type Dashboard = {
  product: { total: number };
  balance: { total: number };
  sales: { total: number };
  user: {
    id: number;
    name: string;
  };
};
