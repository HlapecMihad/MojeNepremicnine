package si.primerjanjeCen.nepremicnine;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "https://praktikum2-deploy-git-main-lukas-projects-10bd2c33.vercel.app",
                        "http://localhost:3000", // Include localhost (assuming your local frontend runs on port 3000)
                        "http://localhost:8180/api",
                        "http://localhost:8180" // Include localhost (common port for backend or alternate frontend)
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
