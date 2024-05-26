package si.primerjanjeCen.nepremicnine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nepremicnine")
public class NepremicninaController {

    @Autowired
    private NepremicninaRepository nepremicninaRepository;

    @GetMapping
    public List<Nepremicnina> getAllNepremicnine() {
        return nepremicninaRepository.findAll();
    }
}