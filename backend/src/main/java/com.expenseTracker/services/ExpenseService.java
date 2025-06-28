package com.expenseTracker.services;

import com.expenseTracker.entities.CategoryEntity;
import com.expenseTracker.entities.ExpenseEntity;
import com.expenseTracker.respositories.CategoryRepository;
import com.expenseTracker.respositories.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    public List<ExpenseEntity> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public ExpenseEntity addExpense(ExpenseEntity expense) {
        expense.setCategory(ensureCategory(expense.getCategory()));
        return expenseRepository.save(expense);
    }

    public boolean isNotExistsById(Long id) {
        return !expenseRepository.existsById(id);
    }

    public boolean deleteExpense(Long id) {
        if (isNotExistsById(id)) return false;
        expenseRepository.deleteById(id);
        return true;
    }

    public ExpenseEntity updateExpense(Long id, ExpenseEntity expense) {
        if (isNotExistsById(id)) return null;
        expense.setId(id);
        expense.setCategory(ensureCategory(expense.getCategory()));
        return expenseRepository.save(expense);
    }

    private CategoryEntity ensureCategory(CategoryEntity category) {
        if (category == null || category.getName() == null) return null;
        CategoryEntity existing = categoryRepository.findByNameIgnoreCase(category.getName());
        return existing != null ? existing : categoryRepository.save(category);
    }

    public ExpenseEntity getExpenseById(Long id) {
        return expenseRepository.findById(id).orElse(null);
    }
}