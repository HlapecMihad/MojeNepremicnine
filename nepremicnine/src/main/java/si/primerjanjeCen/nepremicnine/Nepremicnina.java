package si.primerjanjeCen.nepremicnine;

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
    private String tipNepremicnine;
    private String lokacija;
    private double cena;
    private int stSob;
    private int stSpalnic;
    private int stKopalnic;
    private int letoIzgradnje;
    private String stNadstopij;
    private String velikostZemljisca;
    private String velikostSkupaj;
    private String idNepremicnine;
    private List<String> imageUrls;
    private String opis;
    private String letoObnove;
    private String agencija;
    private List<String> lastnosti;

}