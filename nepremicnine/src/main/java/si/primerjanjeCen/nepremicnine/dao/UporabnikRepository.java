package si.primerjanjeCen.nepremicnine.dao;

import si.primerjanjeCen.nepremicnine.vao.Uporabnik;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UporabnikRepository extends MongoRepository<Uporabnik, String> {
    Optional<Uporabnik> findByEmail(String email);
}
