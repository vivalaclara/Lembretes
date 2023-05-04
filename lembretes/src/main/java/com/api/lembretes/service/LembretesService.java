package com.api.lembretes.service;

import java.time.LocalDate;
import java.util.List;

import com.api.lembretes.model.LembretesModel;
import com.api.lembretes.repository.LembretesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@Transactional
public class LembretesService {

    @Autowired
    private LembretesRepository lembretesRepository;

    public LembretesModel adicionarLembrete(LembretesModel lembrete) {
        validarCamposLembrete(lembrete);
        LembretesModel lembreteCriado = lembretesRepository.save(lembrete);
        return lembreteCriado;
    }

    //deleta o lembrete
    public void removerLembrete(Long id) {
        lembretesRepository.deleteById(id);
    }

    //lista os lembretes
    public List<LembretesModel> listarLembretes() {
        return lembretesRepository.findAll();
    }

    //validação de lembretes
    private void validarCamposLembrete(LembretesModel lembrete) {
        if (StringUtils.isEmpty(lembrete.getNome())) {
            throw new IllegalArgumentException("O nome do lembrete é obrigatório");
        }

        if (lembrete.getData() == null) {
            throw new IllegalArgumentException("A data do lembrete é obrigatória");
        }

        if (lembrete.getData().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("A data do lembrete deve ser no futuro");
        }
    }
}