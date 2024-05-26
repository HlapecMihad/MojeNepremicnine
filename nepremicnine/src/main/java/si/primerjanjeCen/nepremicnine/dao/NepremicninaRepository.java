package si.primerjanjeCen.nepremicnine.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import si.primerjanjeCen.nepremicnine.vao.Nepremicnina;

public interface NepremicninaRepository extends MongoRepository<Nepremicnina, String> {

}