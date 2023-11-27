import {Component, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {ApiService} from "../../_services/api.service";
import {CurrencyType, Expense, ExpenseType} from "../../expense";
import {ModalService} from "../../_services/modal.service";
import {ModalComponent} from "../modal/modal.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpacePipe} from "../../_pipes/space.pipe";

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, SpacePipe, ReactiveFormsModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss'
})
export class ExpenseTableComponent implements OnInit {

  expenses: Expense[] = [];
  protected readonly ExpenseType = ExpenseType;
  protected readonly CurrencyType = CurrencyType;

  expenseForm: FormGroup = this.formBuilder.group({
    expenseName: ['', Validators.required],
    expenseAmount: ['', Validators.required],
    expenseType: ['', Validators.required],
    selectedCurrency: ['', Validators.required]
  });

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              protected modalService: ModalService, private currencyPipe: CurrencyPipe) {

    this.getExpenses();
  }

  ngOnInit(): void {
    this.expenseForm.valueChanges.subscribe(form => {
      if (form.expenseAmount) {
        this.expenseForm.patchValue({
          expenseAmount: this.currencyPipe.transform(
            this.expenseForm.value.expenseAmount?.replace(/\D/g, '').replace(/^0+/, ''), this.expenseForm.value.selectedCurrency,'symbol-narrow', '1.0-0')
        })
      }
    })
  }

  createNewExpense() {

    let expense: Expense = {
      name: this.expenseForm.value.expenseName,
      type: this.expenseForm.value.expenseType,
      amount: Number.parseInt(this.expenseForm.value.expenseAmount.replaceAll(',', '').substring(1)),
      currencyType: this.expenseForm.value.selectedCurrency
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
