package com.project.kapil.ExpenseTracker.ExpenseTracker.respositories;

import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    CategoryEntity findByNameIgnoreCase(String categoryName);
}
