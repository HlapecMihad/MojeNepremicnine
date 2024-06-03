package si.primerjanjeCen.nepremicnine.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.primerjanjeCen.nepremicnine.dao.UporabnikRepository;
import org.springframework.http.ResponseEntity;
import si.primerjanjeCen.nepremicnine.dao.UporabnikRepository;
import si.primerjanjeCen.nepremicnine.services.PasswordService;
import si.primerjanjeCen.nepremicnine.vao.Uporabnik;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/uporabniki")
public class UporabnikController {

    @Autowired
    private UporabnikRepository uporabnikDao;

    @Autowired
    private PasswordService passwordService;

    @PostMapping("/registracija")
    public ResponseEntity<?> registrirajUporabnika(@RequestBody Uporabnik uporabnik) {
        Optional<Uporabnik> existingUser = uporabnikDao.findByEmail(uporabnik.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(409).body("Uporabnik s tem emailom ze obstaja.");
        }
        String hashedPassword = passwordService.hashPassword(uporabnik.getGeslo());
        uporabnik.setGeslo(hashedPassword);
        uporabnikDao.save(uporabnik);
        return ResponseEntity.ok("Uporanik uspesno registriran.");
    }


    @PostMapping("/prijava")
    public ResponseEntity<?> prijaviUporabnika(@RequestBody Uporabnik loginRequest) {
        Optional<Uporabnik> userOptional = uporabnikDao.findByEmail(loginRequest.getEmail());
        if (userOptional.isPresent()) {
            Uporabnik user = userOptional.get();
            if (passwordService.checkPassword(loginRequest.getGeslo(), user.getGeslo())) {
                return ResponseEntity.ok(new LoginResponse(user.getIme(), user.getPriimek()));
            }
        }
        return ResponseEntity.status(401).body("Napačno uporabniško ime ali geslo.");
    }

    private static class LoginResponse {
        private String ime;
        private String priimek;

        public LoginResponse(String ime, String priimek) {
            this.ime = ime;
            this.priimek = priimek;
        }

        public String getIme() {
            return ime;
        }

        public String getPriimek() {
            return priimek;
        }
    }
}