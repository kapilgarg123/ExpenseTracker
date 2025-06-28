package com.project.kapil.ExpenseTracker.ExpenseTracker.controllers;


import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.CategoryEntity;
import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.ExpenseEntity;
import com.project.kapil.ExpenseTracker.ExpenseTracker.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping()
    public List<CategoryEntity> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}/expenses")
    public List<ExpenseEntity> getExpensesByCategoryId(@PathVariable Long id) {
        return categoryService.getExpensesByCategoryId(id);
    }

    @PostMapping("/add")
    public String addCategory(@RequestBody CategoryEntity category) {
        return categoryService.addCategory(category);
    }

    @PutMapping("/{id}")
    public String updateCategory(@PathVariable Long id, @RequestBody CategoryEntity category) {
        return categoryService.updateCategory(id, category);
    }

    @GetMapping("/{id}")
    public CategoryEntity getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
}
