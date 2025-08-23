export type TransactionType = 'EXPENSE' | 'INCOME';

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  userId: string;
};

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: Date;
  type: TransactionType;
  categoryId: string;
  userId: string;
  accountId: string;
  category?: Category;
};

export type Account = {
  id: string;
  name: string;
  balance: number;
  userId: string;
};

export type Group = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  ownerId: string;
};

export type GroupMember = {
  id: string;
  groupId: string;
  userId: string;
  joinedAt: Date;
};

export type GroupTransaction = {
  id: string;
  groupId: string;
  amount: number;
  description: string;
  date: Date;
  payerId: string;
  split: {
    userId: string;
    amount: number;
  }[];
};

export type AnalyticsPeriod = 'daily' | 'weekly' | 'monthly';

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type AIInsight = {
  id: string;
  userId: string;
  month: string;
  year: number;
  content: string;
  createdAt: Date;
};