package com.priyanshu.bookstore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/index.html", "/static/**",
                                 "/api/auth/**", "/api/books/**", "/api/customers/**").permitAll()
                .requestMatchers("/api/admin/**").permitAll() // allow admin temporarily
                .anyRequest().permitAll() // allow all for testing
            )
            .httpBasic(Customizer.withDefaults()) // basic auth for testing
            .formLogin(form -> form.disable()) // disable default login page
            .logout(logout -> logout.disable()); // disable default logout behavior

        return http.build();
    }

    @SuppressWarnings("deprecation") // suppress warning for NoOpPasswordEncoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        // Only for demo purposes — stores passwords in plain text
        return org.springframework.security.crypto.password.NoOpPasswordEncoder.getInstance();
    }
}
