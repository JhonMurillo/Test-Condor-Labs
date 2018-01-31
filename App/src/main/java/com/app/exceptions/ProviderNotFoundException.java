/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.exceptions;

/**
 *
 * @author DESARROLLO
 */
public class ProviderNotFoundException extends Exception{
    private String message;

   
    public ProviderNotFoundException(String id) {
        this.message = "Provider Not Found: ".concat(id);
        System.err.println(this.message);
    }

    @Override
    public String getMessage() {
        return message;
    }  
    
}
