package com.project.kapil.ExpenseTracker.ExpenseTracker.services;


import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.CategoryEntity;
import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.ExpenseEntity;
import com.project.kapil.ExpenseTracker.ExpenseTracker.respositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<ExpenseEntity> getExpensesByCategoryId(Long id) {
        Optional<CategoryEntity> currCategory = categoryRepository.findById(id);
        if (currCategory.isPresent()) {
            CategoryEntity category = currCategory.get();
            return category.getExpenses();
        }
        return null;
    }

    public String addCategory(CategoryEntity category) {
        CategoryEntity existing = categoryRepository.findByNameIgnoreCase(category.getName().trim());
        if (existing != null) {
            return "Category with name '" + category.getName() + "' already exists.";
        }
        categoryRepository.save(category);
        return "Category '" + category.getName() + "' added successfully.";
    }
}
