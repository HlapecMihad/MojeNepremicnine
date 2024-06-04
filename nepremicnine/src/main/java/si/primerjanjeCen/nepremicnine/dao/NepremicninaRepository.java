package si.primerjanjeCen.nepremicnine.dao;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import si.primerjanjeCen.nepremicnine.vao.Nepremicnina;

import java.util.List;

public interface NepremicninaRepository extends MongoRepository<Nepremicnina, String> {
    List<Nepremicnina> findByIdIn(List<String> ids);
}
