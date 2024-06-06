package si.primerjanjeCen.nepremicnine.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import si.primerjanjeCen.nepremicnine.vao.NepremicninaOddaja;

import java.util.List;

public interface NepremicninaRepositoryOddaja extends MongoRepository<NepremicninaOddaja, String> {

    List<NepremicninaOddaja> findByIdIn(List<String> ids);
}
