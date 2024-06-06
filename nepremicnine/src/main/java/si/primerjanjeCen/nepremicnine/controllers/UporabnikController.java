package si.primerjanjeCen.nepremicnine.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.primerjanjeCen.nepremicnine.dao.NepremicninaRepository;
import si.primerjanjeCen.nepremicnine.dao.UporabnikRepository;
import si.primerjanjeCen.nepremicnine.services.PasswordService;
import si.primerjanjeCen.nepremicnine.vao.Uporabnik;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/uporabniki")
public class UporabnikController {

    @Autowired
    private UporabnikRepository uporabnikDao;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private PasswordService passwordService;

    @Autowired
    private NepremicninaRepository nepremicninaDao;

    @PostMapping("/registracija")
    public ResponseEntity<?> registrirajUporabnika(@RequestBody Uporabnik uporabnik) {
        Optional<Uporabnik> existingUser = uporabnikDao.findByEmail(uporabnik.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(409).body("Uporabnik s tem emailom že obstaja.");
        }
        String hashedPassword = passwordService.hashPassword(uporabnik.getGeslo());
        uporabnik.setGeslo(hashedPassword);
        uporabnikDao.save(uporabnik);
        return ResponseEntity.ok("Uporabnik uspešno registriran.");
    }

    @PostMapping("/prijava")
    public ResponseEntity<?> prijaviUporabnika(@RequestBody Uporabnik loginRequest) {
        Optional<Uporabnik> userOptional = uporabnikDao.findByEmail(loginRequest.getEmail());
        if (userOptional.isPresent()) {
            Uporabnik user = userOptional.get();
            if (passwordService.checkPassword(loginRequest.getGeslo(), user.getGeslo())) {
                return ResponseEntity.ok(new LoginResponse(user.getIme(), user.getPriimek(), user.getEmail()));
            }
        }
        return ResponseEntity.status(401).body("Napačno uporabniško ime ali geslo.");
    }

    @PostMapping("/addFavorite")
    public ResponseEntity<?> addFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        String userEmail = favoriteRequest.getUserEmail();
        String propertyId = favoriteRequest.getPropertyId();

        Optional<Uporabnik> userOptional = uporabnikDao.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            Uporabnik user = userOptional.get();
            if (!user.getPriljubljeneNepremicnine().contains(propertyId)) {
                Query query = new Query(Criteria.where("email").is(userEmail));
                Update update = new Update().addToSet("priljubljeneNepremicnine", propertyId);
                mongoTemplate.updateFirst(query, update, Uporabnik.class);
                return ResponseEntity.ok("Property added to favorites");
            } else {
                return ResponseEntity.status(409).body("Property already in favorites");
            }
        }
        return ResponseEntity.status(404).body("User not found");
    }


    @PostMapping("/removeFavorite")
    public ResponseEntity<?> removeFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        String userEmail = favoriteRequest.getUserEmail();
        String propertyId = favoriteRequest.getPropertyId();

        Optional<Uporabnik> userOptional = uporabnikDao.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            Uporabnik user = userOptional.get();
            if (user.getPriljubljeneNepremicnine().contains(propertyId)) {
                Query query = new Query(Criteria.where("email").is(userEmail));
                Update update = new Update().pull("priljubljeneNepremicnine", propertyId);
                mongoTemplate.updateFirst(query, update, Uporabnik.class);
                return ResponseEntity.ok("Property removed from favorites");
            } else {
                return ResponseEntity.status(404).body("Property not found in favorites");
            }
        }
        return ResponseEntity.status(404).body("User not found");
    }

    @GetMapping("/{email}/favorites")
    public ResponseEntity<?> getFavorites(@PathVariable String email) {
        Optional<Uporabnik> userOptional = uporabnikDao.findByEmail(email);
        if (userOptional.isPresent()) {
            Uporabnik user = userOptional.get();
            List<String> favoriteProperties = user.getPriljubljeneNepremicnine();
            return ResponseEntity.ok(favoriteProperties);
        }
        return ResponseEntity.status(404).body("User not found");
    }

    private static class LoginResponse {
        private String ime;
        private String priimek;
        private String email;

        public LoginResponse(String ime, String priimek, String email) {
            this.ime = ime;
            this.priimek = priimek;
            this.email = email;
        }

        public String getIme() {
            return ime;
        }

        public String getPriimek() {
            return priimek;
        }

        public String getEmail() {
            return email;
        }
    }
}