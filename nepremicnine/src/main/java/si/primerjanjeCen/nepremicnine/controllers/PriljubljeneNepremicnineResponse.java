package si.primerjanjeCen.nepremicnine.controllers;

import si.primerjanjeCen.nepremicnine.vao.Nepremicnina;
import si.primerjanjeCen.nepremicnine.vao.NepremicninaOddaja;

import java.util.List;

public class PriljubljeneNepremicnineResponse {
    private List<Nepremicnina> nepremicnine;
    private List<NepremicninaOddaja> nepremicnineOddaja;

    // Getters and setters
    public List<Nepremicnina> getNepremicnine() {
        return nepremicnine;
    }

    public void setNepremicnine(List<Nepremicnina> nepremicnine) {
        this.nepremicnine = nepremicnine;
    }

    public List<NepremicninaOddaja> getNepremicnineOddaja() {
        return nepremicnineOddaja;
    }

    public void setNepremicnineOddaja(List<NepremicninaOddaja> nepremicnineOddaja) {
        this.nepremicnineOddaja = nepremicnineOddaja;
    }
}
