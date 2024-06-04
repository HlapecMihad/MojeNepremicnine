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
@Document(collection = "nepremicnine_vse")
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
    private String st_nadstropij;
    private String velikost_zemljisca;
    private String velikost_skupaj;
    private String id_nepremicnine;
    private List<String> image_urls;
    private String opis;
    private String leto_obnove;
    private String agencija;
    private List<String> lastnosti;

    public int getCenaInt() {
        try {
            return Integer.parseInt(cena);
        } catch (NumberFormatException e) {
            // Handle conversion failure, you could log this or take another action
            return 0; // Default value or throw an exception if appropriate
        }
    }

    public int getSt_sob() {
        try {
            return Integer.parseInt(st_sob);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public int getSt_spalnic() {
        try {
            return Integer.parseInt(st_spalnic);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public int getSt_kopalnic() {
        try {
            return Integer.parseInt(st_kopalnic);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public int getLeto_izgradnje() {
        try {
            return Integer.parseInt(leto_izgradnje);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public int getSt_nadstropij() {
        try {
            return Integer.parseInt(st_nadstropij);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    /*
     * public int getVelikost_zemljisca() {
     * try {
     * return Double.parseDouble(velikost_zemljisca.replaceAll("[^\\d,\\.]",
     * "").replace(",", "."));
     * } catch (NumberFormatException e) {
     * return 0.0;
     * }
     * }
     * 
     * public double getVelikost_skupaj() {
     * try {
     * return Double.parseDouble(velikost_skupaj.replaceAll("[^\\d,\\.]",
     * "").replace(",", "."));
     * } catch (NumberFormatException e) {
     * return 0.0;
     * }
     * }
     */

    public int getLeto_obnove() {
        try {
            return Integer.parseInt(leto_obnove);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
