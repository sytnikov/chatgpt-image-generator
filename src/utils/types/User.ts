export type User = {
  balances: Balance[]
  countryMatch: boolean
  paid: boolean
  payments: any[]
  subscriptions: Subscription[]
  user: UserDetails
}

interface Balance {
  count: number;
  type: string;
}

interface Subscription {
  cancel_at: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  created: string;
  current_period_end: string;
  current_period_start: string;
  ended_at: string | null;
  id: string;
  status: string;
  user_id: string;
}

interface UserDetails {
  avatar: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
}