package com.api.lembretes.repository;

import com.api.lembretes.model.LembretesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LembretesRepository extends JpaRepository<LembretesModel,Long> {
}
