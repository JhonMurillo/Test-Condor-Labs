/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.utils;

/**
 *
 * @author Desarrollo3
 */
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ObjectMapperUtil {

    private static ObjectMapper mapperObject;

    public static ObjectMapper getInstanceObjectMapper() {
        if (mapperObject == null) {
            mapperObject = new ObjectMapper();
            mapperObject.setSerializationInclusion(Include.ALWAYS);
//            DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
//            mapperObject.setDateFormat(df);
            // mapperObject.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
            mapperObject.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
            mapperObject.setVisibilityChecker(mapperObject.getSerializationConfig().getDefaultVisibilityChecker()
                    .withFieldVisibility(JsonAutoDetect.Visibility.ANY)
                    .withGetterVisibility(JsonAutoDetect.Visibility.NONE)
                    .withSetterVisibility(JsonAutoDetect.Visibility.NONE)
                    .withCreatorVisibility(JsonAutoDetect.Visibility.DEFAULT));
        }
        return mapperObject;
    }
}
