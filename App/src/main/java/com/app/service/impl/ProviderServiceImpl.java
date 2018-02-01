/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.service.impl;

import com.app.model.Provider;
import com.app.model.Specialty;
import com.app.repository.ProviderRepository;
import com.app.repository.SpecialtyRepository;
import com.app.service.ProviderService;
import java.util.List;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author DESARROLLO
 */
@Service("providerService")
public class ProviderServiceImpl implements ProviderService {

    @Autowired
    ProviderRepository providerRepository;
    
    @Autowired
    SpecialtyRepository specialtyRepository;

  
    @Override
    public List<Provider> findAll() {
        Iterable<Provider> provider = providerRepository.findAll();
        return (List<Provider>) provider;
    }

    @Override
    public Provider saveOrUpdateProvider(Provider provider) {
        
            Specialty specialty = provider.getSpecialty();
            if (specialty != null) {
                if (specialty.getId() != null) {
                    Specialty specialtyAux = specialtyRepository.findOne(specialty.getId());
                    if (specialtyAux == null) {
                        specialty = specialtyRepository.save(specialty);
                    } else {
                        specialty = specialtyAux;
                    }
                } else {
                    specialty = specialtyRepository.save(specialty);
                }
                provider.setSpecialty(specialty);
            }        
        return providerRepository.save(provider);
    }

    @Override
    public void deleteProvider(String providerId) {
        providerRepository.delete(providerId);
    }

    @Override
    public Provider findById(String uuid) {
        return providerRepository.findOne(uuid);
    }
}
