package si.primerjanjeCen.nepremicnine.vao;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@ToString
@Document(collection = "nepremicnine")
public class Nepremicnina {

    @Id
    private String id;
    private String naziv;
    private String posredovanje;
    private String link;
    private String tip_nepremicnine;
    private String lokacija;
    private String cena;
    private String st_sob;
    private String st_spalnic;
    private String st_kopalnic;
    private String leto_izgradnje;
    private String st_nadstopij;
    private String velikost_zemljisca;
    private String velikost_skupaj;
    private String id_nepremicnine;
    private List<String> image_urls;
    private String opis;
    private String leto_obnove;
    private String agencija;
    private List<String> lastnosti;


    public String getCena() {
        return cena;
    }

    public String getSt_sob() {
        return st_sob;
    }

    public String getSt_spalnic() {
        return st_spalnic;
    }

    public String getSt_kopalnic() {
        return st_kopalnic;
    }

    public String getLeto_izgradnje() {
        return leto_izgradnje;
    }

    public String getSt_nadstopij() {
        return st_nadstopij;
    }

    public String getVelikost_zemljisca() {
        return velikost_zemljisca;
    }

    public String getVelikost_skupaj() {
        return velikost_skupaj;
    }

    public String getLeto_obnove() {
        return leto_obnove;
    }
}
