export interface Expense {
  id?: number,
  name: string,
  type?: ExpenseType,
  amount: number;
}

export enum ExpenseType {
  DEBIT = ("DEBIT"),
  CREDIT = ("CREDIT"),
  CASH = ("CASH")
}

export enum CurrencyType {
  DOLLAR= ("$"),
  EURO = ("€"),
  RUBLE = ("₽"),
}
