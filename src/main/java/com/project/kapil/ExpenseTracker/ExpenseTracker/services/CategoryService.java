package com.project.kapil.ExpenseTracker.ExpenseTracker.services;


import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.CategoryEntity;
import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.ExpenseEntity;
import com.project.kapil.ExpenseTracker.ExpenseTracker.respositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
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

    public String updateCategory(Long id, CategoryEntity category) {
        Optional<CategoryEntity> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isEmpty()) {
            return "Category with id '" + id + "' does not exist.";
        }
        CategoryEntity updatedCategory = existingCategory.get();
        updatedCategory.setName(category.getName());
        categoryRepository.save(updatedCategory);
        return "Category with id '" + id + "' updated successfully.";
    }

    public CategoryEntity getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public String deleteCategory(Long id) {
        Optional<CategoryEntity> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isEmpty()) {
            return "Category with id '" + id + "' does not exist.";
        } else if (!categoryOptional.get().getExpenses().isEmpty()) {
            return "Category with id '" + id + "' cannot be deleted because it has associated expenses.";
        }
        categoryRepository.deleteById(id);
        return "Category with id '" + id + "' deleted successfully.";
    }
}
