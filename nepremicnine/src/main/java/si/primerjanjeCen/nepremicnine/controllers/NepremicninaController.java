package si.primerjanjeCen.nepremicnine.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import si.primerjanjeCen.nepremicnine.dao.NepremicninaRepository;
import si.primerjanjeCen.nepremicnine.vao.Nepremicnina;

import java.util.Arrays;
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

    @GetMapping("prvihDvanajst")
    public List<Nepremicnina> getPrvihDvanajst() {
        return nepremicninaDao.findAll(PageRequest.of(0, 12)).getContent();
    }
    @GetMapping("vrniGledeNaStran")
    public List<Nepremicnina> getBasedOnPage(@RequestParam(defaultValue = "0") int page) {
        return nepremicninaDao.findAll(PageRequest.of(page, 21)).getContent();
    }

    @GetMapping("steviloVseh")
    public long getSteviloVseh(){
        return nepremicninaDao.count();
    }

    @GetMapping("vrniPriljubljeneNepremicnine")
    public List<Nepremicnina> getPriljubljeneNepremicnine(@RequestParam String priljubljeneNepremicnine) {
        List<String> ids = Arrays.asList(priljubljeneNepremicnine.split(","));
        return nepremicninaDao.findByIdIn(ids);
    }
}
