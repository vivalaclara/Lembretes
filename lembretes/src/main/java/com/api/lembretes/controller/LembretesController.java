package com.api.lembretes.controller;

import java.util.List;

import com.api.lembretes.model.LembretesModel;
import com.api.lembretes.service.LembretesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lembretes")
public class LembretesController {
    @Autowired
    private LembretesService lembretesService;

    @PostMapping
    public ResponseEntity<LembretesModel> adicionarLembrete(@RequestBody LembretesModel lembrete) {
        LembretesModel lembreteCriado = lembretesService.adicionarLembrete(lembrete);
        return new ResponseEntity<>(lembreteCriado, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerLembrete(@PathVariable Long id) {
        lembretesService.removerLembrete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<LembretesModel>> listarLembretes() {
        List<LembretesModel> lembretes = lembretesService.listarLembretes();
        return ResponseEntity.ok(lembretes);
    }
}
