/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.controller;

import com.app.dto.ProviderDTO;
import com.app.dto.SpecialtyDTO;
import com.app.exceptions.ProviderNotFoundException;
import com.app.model.Provider;
import com.app.model.Specialty;
import com.app.service.ProviderService;
import com.app.utils.ObjectMapperUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import javax.ws.rs.core.Response;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author DESARROLLO
 */
@RestController
@RequestMapping("/provider")
@Api(value = "Provider RestController", description = "This API has a CRUD for Provider")
@Produces(APPLICATION_JSON)
@Consumes(APPLICATION_JSON)
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    public ObjectMapper objectMapper = ObjectMapperUtil.getInstanceObjectMapper();

    public final static org.slf4j.Logger LOG = LoggerFactory.getLogger(ProviderController.class);

    @RequestMapping(value = "all", method = RequestMethod.GET)
    public List<ProviderDTO> listado() {
        try {
            List<ProviderDTO> listProviderDTO = new ArrayList<>();
            providerService.findAll().stream().map((provider) -> {
                SpecialtyDTO specialtyDTO = objectMapper.convertValue(provider.getSpecialty(), SpecialtyDTO.class);
                ProviderDTO providerDTO = objectMapper.convertValue(provider, ProviderDTO.class);
                providerDTO.setSpecialtyDTO(specialtyDTO);
                return providerDTO;
            }).forEachOrdered((providerDTO) -> {
                listProviderDTO.add(providerDTO);
            });
            return listProviderDTO;
        } catch (IllegalArgumentException ex) {
            return new ArrayList<>();
        }
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = "Save ProviderDTO", notes = "Return ResponseUtil")
    public Response saveProvider(@RequestBody @Valid ProviderDTO providerDTO) {
        try {
            Specialty specialty = objectMapper.convertValue(providerDTO.getSpecialtyDTO(), Specialty.class);
            Provider provider = objectMapper.convertValue(providerDTO, Provider.class);
            provider.setSpecialty(specialty);
            provider = providerService.saveOrUpdateProvider(provider);
            specialty = provider.getSpecialty();

            SpecialtyDTO specialtyDTO = objectMapper.convertValue(specialty, SpecialtyDTO.class);
            providerDTO = objectMapper.convertValue(provider, ProviderDTO.class);
            providerDTO.setSpecialtyDTO(specialtyDTO);
            return Response.ok().entity(new GenericEntity<ProviderDTO>(providerDTO) {
            }).build();
        } catch (Exception ex) {
            return Response.serverError().entity(providerDTO).build();
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @ApiOperation(value = "Update ProviderDTO", notes = "Return ResponseUtil")
    public Response uptadeProvider(@RequestBody @Valid ProviderDTO providerDTO) {
        try {
            if (validProvider(providerDTO.getId()) != null) {
                Specialty specialty = objectMapper.convertValue(providerDTO.getSpecialtyDTO(), Specialty.class);
                Provider provider = objectMapper.convertValue(providerDTO, Provider.class);
                provider.setSpecialty(specialty);
                provider = providerService.saveOrUpdateProvider(provider);
                specialty = provider.getSpecialty();

                SpecialtyDTO specialtyDTO = objectMapper.convertValue(specialty, SpecialtyDTO.class);
                providerDTO = objectMapper.convertValue(provider, ProviderDTO.class);
                providerDTO.setSpecialtyDTO(specialtyDTO);
                return Response.ok().entity(new GenericEntity<ProviderDTO>(providerDTO) {
                }).build();
            } else {
                throw new ProviderNotFoundException(providerDTO.getId());
            }
        } catch (Exception ex) {
            return Response.serverError().tag(ex.getMessage()).build();
        }
    }

    /**
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ApiOperation(value = "Delete ProviderDTO", notes = "Return ResponseUtil")
    public Response deleteProvider(@PathVariable("id") String id) {
        try {
            if (validProvider(id) != null) {
                providerService.deleteProvider(id);
                return Response.ok().build();
            } else {
                throw new ProviderNotFoundException(id);
            }
        } catch (Exception ex) {
            return Response.serverError().tag(ex.getMessage()).build();
        }
    }

    private Provider validProvider(String uuid) {
        try {
            return providerService.findById(uuid);
        } catch (Exception ex) {
            return null;
        }
    }

}
