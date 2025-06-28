package com.expenseTracker.controllers;

import com.expenseTracker.entities.ExpenseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.expenseTracker.services.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/expense")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @GetMapping()
    public List<ExpenseEntity> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @PostMapping("/add")
    public ExpenseEntity addExpense(@RequestBody ExpenseEntity expense) {
        return expenseService.addExpense(expense);
    }

    @DeleteMapping("/{id}")
    public boolean deleteExpense(@PathVariable Long id) {
        return expenseService.deleteExpense(id);
    }

    @PutMapping("/{id}")
    public ExpenseEntity updateExpense(@PathVariable Long id, @RequestBody ExpenseEntity expense) {
        return expenseService.updateExpense(id, expense);
    }

    @GetMapping("/{id}/expenses")
    public ExpenseEntity getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

}
