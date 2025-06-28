package com.expenseTracker.respositories;

import com.expenseTracker.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    CategoryEntity findByNameIgnoreCase(String categoryName);
}
