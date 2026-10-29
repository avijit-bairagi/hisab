package com.hisab.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Hashed Vite assets (JS, CSS, fonts): aggressive immutable caching
        // file:frontend/dist/ fallback enables running directly in IntelliJ IDEA or Eclipse without needing JAR packaging
        registry.addResourceHandler("/assets/**")
                .addResourceLocations(
                        "classpath:/static/assets/",
                        "file:frontend/dist/assets/"
                )
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS).cachePublic().immutable());

        // Favicons and root metadata
        registry.addResourceHandler("/favicon.svg", "/favicon.ico", "/robots.txt")
                .addResourceLocations(
                        "classpath:/static/",
                        "file:frontend/dist/"
                )
                .setCacheControl(CacheControl.noCache().mustRevalidate());

        // index.html explicitly configured for no-cache revalidation
        registry.addResourceHandler("/index.html")
                .addResourceLocations(
                        "classpath:/static/",
                        "file:frontend/dist/"
                )
                .setCacheControl(CacheControl.noCache().noStore().mustRevalidate());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}
