/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.service.impl;

import com.app.model.Provider;
import com.app.repository.ProviderRepository;
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

  
    @Override
    public List<Provider> findAll() {
        Iterable<Provider> provider = providerRepository.findAll();
        return (List<Provider>) provider;
    }

    @Override
    public Provider saveOrUpdateProvider(Provider provider) {
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
