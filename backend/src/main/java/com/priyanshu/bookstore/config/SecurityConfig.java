package com.priyanshu.bookstore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

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
                .requestMatchers("/api/admin/**").permitAll() // ✅ Allow admin temporarily
                .anyRequest().permitAll() // ✅ Allow everything for demo
            )
            .httpBasic(Customizer.withDefaults()) // Basic auth still available if needed
            .formLogin(login -> login.disable())  // ✅ disable login form
            .logout(logout -> logout.disable());  // ✅ disable logout redirect loop

        return http.build();
    }

    @SuppressWarnings("deprecation")  // hides yellow warning safely
    @Bean
    public PasswordEncoder passwordEncoder() {
        // For demo only — stores passwords as plain text
        return org.springframework.security.crypto.password.NoOpPasswordEncoder.getInstance();
    }
}
