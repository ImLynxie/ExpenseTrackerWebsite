export interface Expense {
  id?: number,
  name: string,
  type?: ExpenseType,
  amount: number;
  currencyType?: CurrencyType
}

export enum ExpenseType {
  DEBIT = ("DEBIT"),
  CREDIT = ("CREDIT"),
  CASH = ("CASH")
}

export enum CurrencyType {
  USD = ("USD"),
  EUR = ("EUR"),
  RUB = ("RUB"),
}
