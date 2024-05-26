package si.primerjanjeCen.nepremicnine.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.primerjanjeCen.nepremicnine.dao.NepremicninaRepository;
import si.primerjanjeCen.nepremicnine.vao.Nepremicnina;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/nepremicnine")
public class NepremicninaController {

    @Autowired
    private NepremicninaRepository nepremicninaDao;

    @GetMapping("vseNepremicnine")
    public List<Nepremicnina> getAllNepremicnine() {
        return nepremicninaDao.findAll();
    }
}