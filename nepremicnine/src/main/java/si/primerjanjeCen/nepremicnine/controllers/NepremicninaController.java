package si.primerjanjeCen.nepremicnine.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;
import si.primerjanjeCen.nepremicnine.dao.NepremicninaRepository;
import si.primerjanjeCen.nepremicnine.dao.NepremicninaRepositoryOddaja;
import si.primerjanjeCen.nepremicnine.vao.Nepremicnina;
import si.primerjanjeCen.nepremicnine.vao.NepremicninaOddaja;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/nepremicnine")
public class NepremicninaController {

    @Autowired
    private NepremicninaRepository nepremicninaDao;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private NepremicninaRepositoryOddaja nepremicninaDaoOddaja;

    @GetMapping("vseNepremicnine")
    public List<Nepremicnina> getAllNepremicnine() {
        return nepremicninaDao.findAll();
    }

    @GetMapping("prvihDvanajst")
    public List<Nepremicnina> getPrvihDvanajst() {
        return nepremicninaDao.findAll(PageRequest.of(0, 12)).getContent();
    }

    @GetMapping("oddaja/vrniGledeNaStran")
    public List<NepremicninaOddaja> getBasedOnPageOddaja(@RequestParam(defaultValue = "0") int page) {
        return nepremicninaDaoOddaja.findAll(PageRequest.of(page, 21)).getContent();
    }

    @GetMapping("prodaja/vrniGledeNaStran")
    public List<Nepremicnina> getBasedOnPage(@RequestParam(defaultValue = "0") int page) {
        return nepremicninaDao.findAll(PageRequest.of(page, 21)).getContent();
    }

    @GetMapping("prodaja/steviloVseh")
    public long getSteviloVseh() {
        return nepremicninaDao.count();
    }

    @GetMapping("oddaja/steviloVseh")
    public long getSteviloVsehOddaja() {
        return nepremicninaDaoOddaja.count();
    }

    @GetMapping("/vrniPriljubljeneNepremicnine")
    public PriljubljeneNepremicnineResponse getPriljubljeneNepremicnine(@RequestParam String priljubljeneNepremicnine) {
        List<String> ids = Arrays.asList(priljubljeneNepremicnine.split(","));

        List<Nepremicnina> nepremicnine = nepremicninaDao.findByIdIn(ids);
        List<NepremicninaOddaja> nepremicnineOddaja = nepremicninaDaoOddaja.findByIdIn(ids);

        PriljubljeneNepremicnineResponse response = new PriljubljeneNepremicnineResponse();
        response.setNepremicnine(nepremicnine);
        response.setNepremicnineOddaja(nepremicnineOddaja);

        return response;
    }



    @GetMapping("filtri")
    public Page<?> getFilteredNepremicnine(
            @RequestParam(required = false) String posredovanje,
            @RequestParam(required = false) String tip_nepremicnine,
            @RequestParam(required = false) String lokacija,
            @RequestParam(required = false) Integer cenaMin,
            @RequestParam(required = false) Integer cenaMax,
            @RequestParam(required = false) Integer st_sob,
            @RequestParam(required = false) Integer st_spalnic,
            @RequestParam(required = false) Integer st_kopalnic,
            @RequestParam(required = false) Integer leto_izgradnje,
            @RequestParam(required = false) Integer st_nadstropij,
            @RequestParam(required = false) Integer velikost_zemljiscaMin,
            @RequestParam(required = false) Integer velikost_zemljiscaMax,
            @RequestParam(required = false) Integer velikost_skupajMin,
            @RequestParam(required = false) Integer velikost_skupajMax,
            @RequestParam(required = false) String agencija,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "21") int size) {

        Query query = new Query();

        if (tip_nepremicnine != null && !tip_nepremicnine.isEmpty()) {
            query.addCriteria(Criteria.where("tip_nepremicnine").is(tip_nepremicnine));
        }
        if (lokacija != null && !lokacija.isEmpty()) {
            query.addCriteria(Criteria.where("lokacija").is(lokacija));
        }

        if (cenaMin != null || cenaMax != null) {
            Criteria cenaCriteria = new Criteria("cena");
            if (cenaMin != null) {
                cenaCriteria.gte(cenaMin);
            }
            if (cenaMax != null) {
                cenaCriteria.lte(cenaMax);
            }
            query.addCriteria(cenaCriteria);
        }

        if (st_sob != null) {
            query.addCriteria(Criteria.where("st_sob").gte(st_sob));
        }

        if (st_spalnic != null) {
            query.addCriteria(Criteria.where("st_spalnic").gte(st_spalnic));
        }

        if (st_kopalnic != null) {
            query.addCriteria(Criteria.where("st_kopalnic").gte(st_kopalnic));
        }

        if (leto_izgradnje != null) {
            query.addCriteria(Criteria.where("leto_izgradnje").gte(leto_izgradnje));
        }

        if (st_nadstropij != null) {
            query.addCriteria(Criteria.where("st_nadstropij").gte(st_nadstropij));
        }

        if (velikost_zemljiscaMin != null || velikost_zemljiscaMax != null) {
            Criteria velikostZemljiscaCriteria = new Criteria("velikost_zemljisca");
            if (velikost_zemljiscaMin != null) {
                velikostZemljiscaCriteria.gte(velikost_zemljiscaMin);
            }
            if (velikost_zemljiscaMax != null) {
                velikostZemljiscaCriteria.lte(velikost_zemljiscaMax);
            }
            query.addCriteria(velikostZemljiscaCriteria);
        }

        if (velikost_skupajMin != null || velikost_skupajMax != null) {
            Criteria velikostSkupajCriteria = new Criteria("velikost_skupaj");
            if (velikost_skupajMin != null) {
                velikostSkupajCriteria.gte(velikost_skupajMin);
            }
            if (velikost_skupajMax != null) {
                velikostSkupajCriteria.lte(velikost_skupajMax);
            }
            query.addCriteria(velikostSkupajCriteria);
        }

        if (agencija != null && !agencija.isEmpty()) {
            query.addCriteria(Criteria.where("agencija").is(agencija));
        }

        query.with(PageRequest.of(page, size));

        if (posredovanje != null && posredovanje.equals("Oddaja")) {
            List<NepremicninaOddaja> results = mongoTemplate.find(query, NepremicninaOddaja.class);
            long total = mongoTemplate.count(query.skip(0).limit(0), NepremicninaOddaja.class);
            return new PageImpl<>(results, PageRequest.of(page, size), total);
        } else {
            List<Nepremicnina> results = mongoTemplate.find(query, Nepremicnina.class);
            long total = mongoTemplate.count(query.skip(0).limit(0), Nepremicnina.class);
            return new PageImpl<>(results, PageRequest.of(page, size), total);
        }
    }
}
