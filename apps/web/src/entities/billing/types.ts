export interface Balance {
  account_balance: string;
  month_to_date_usage: string;
  month_to_date_balance: string;
  generated_at: string;
}

export interface Invoice {
  uuid: string;
  period: string;
  amount: string;
  created_at: string;
}

export interface BillingHistory {
  date: string;
  type: string;
  invoice: string;
  description: string;
  amount: string;
}
