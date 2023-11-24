import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from "../../_services/api.service";
import {CurrencyType, Expense, ExpenseType} from "../../expense";
import {ModalService} from "../../_services/modal.service";
import {ModalComponent} from "../modal/modal.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss'
})
export class ExpenseTableComponent {

  expenses: Expense[] = [];
  protected readonly ExpenseType = ExpenseType;
  protected readonly CurrencyType = CurrencyType;


  expenseName: string = '';
  expenseType: ExpenseType = ExpenseType.DEBIT;
  expenseAmount: number = 0;

  currencyType: CurrencyType = CurrencyType.DOLLAR;

  constructor(private apiService: ApiService, protected modalService: ModalService) {
    this.getExpenses();
  }

  createNewExpense() {
    let expense: Expense = {
      name: this.expenseName,
      type: this.expenseType,
      amount: this.expenseAmount
    }

    this.apiService.saveNewExpense(expense).subscribe();
    this.closeModalAndRefresh();
  }

  getExpenses() {
    this.apiService.getExpenses().subscribe((data: any[]) => {
      this.expenses = data
    });
  }

  closeModalAndRefresh() {
    this.modalService.close();
    window.location.reload();
  }
}
