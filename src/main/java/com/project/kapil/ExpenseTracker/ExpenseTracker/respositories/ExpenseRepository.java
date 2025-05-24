package com.project.kapil.ExpenseTracker.ExpenseTracker.respositories;

import com.project.kapil.ExpenseTracker.ExpenseTracker.entities.ExpenseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {
}
