package com.project.kapil.ExpenseTracker.ExpenseTracker.services;


import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.CategoryEntity;
import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.ExpenseEntity;
import com.project.kapil.ExpenseTracker.ExpenseTracker.respositories.CategoryRepository;
import com.project.kapil.ExpenseTracker.ExpenseTracker.respositories.ExpenseRepository;
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
        CategoryEntity category = expense.getCategory();

        CategoryEntity existingCategory = categoryRepository.findByNameIgnoreCase(category.getName());
        if (existingCategory == null) {
            existingCategory = categoryRepository.save(category);
        }
        expense.setCategory(existingCategory);
        return expenseRepository.save(expense);
    }

    public boolean isExistsById(Long id) {
        return expenseRepository.existsById(id);
    }

    public boolean deleteExpense(Long id) {
        boolean isExist = isExistsById(id);
        if (!isExist) return false;
        expenseRepository.deleteById(id);
        return true;
    }

    public ExpenseEntity updateExpense(Long id, ExpenseEntity expense) {
        boolean isExist = isExistsById(id);
        if (!isExist) return null;
        expense.setId(id);
        return expenseRepository.save(expense);
    }
}
