/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.swagger;

import com.google.common.base.Predicate;
import static com.google.common.base.Predicates.or;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import static springfox.documentation.builders.PathSelectors.regex;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 *
 * @author DESARROLLO
 */

@EnableSwagger2
@Configuration
public class SwaggerConfiguration {

    /**
     * Publish a bean to generate swagger2 endpoints
     *
     * @return a swagger configuration bean
     */
    @Bean
    public Docket AppApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(AppApiInfo())
                .select()
                .paths(paths())
                .apis(RequestHandlerSelectors.any())
                .build()
                .useDefaultResponseMessages(false);
    }

    private ApiInfo AppApiInfo() {
        return new ApiInfoBuilder()
                .title("Test Condor Labs")
                .description("Spring Boot Documantation  with Swagger")
                .termsOfServiceUrl("http://www-03.ibm.com/software/sla/sladb.nsf/sla/bm?Open")
                .contact("Jhon Mario Murillo Cordoba")
                .license("Apache License Version 2.0")
                .licenseUrl("https://github.com/IBM-Bluemix/news-aggregator/blob/master/LICENSE")
                .version("2.0")
                .build();
    }

    private Predicate<String> paths() {
        return or(
                regex("/provider.*"));
    }
}
