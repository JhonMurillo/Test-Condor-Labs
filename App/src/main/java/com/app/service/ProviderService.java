/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.service;

import com.app.model.Provider;
import java.util.List;

/**
 *
 * @author DESARROLLO
 */
public interface ProviderService {

    /**
     *
     * @return
     */
    List<Provider> findAll();
    
    
    /**
     *
     * @param uuid
     * @return
     */
    Provider findById(String uuid);
   
    /**
     *
     * @param user
     * @return
     */
    Provider saveOrUpdateProvider(Provider user);

    /**
     *
     * @param uuid
     */
    void deleteProvider(String uuid);
}
