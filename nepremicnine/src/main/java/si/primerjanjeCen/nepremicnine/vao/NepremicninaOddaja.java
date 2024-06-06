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
@Document(collection = "nepremicnine_oddaja")
public class NepremicninaOddaja {

    @Id
    private String id;
    private String naziv;
    private String posredovanje;
    private String link;
    private String tip_nepremicnine;
    private String lokacija;
    private Float cena;
    private Float st_sob;
    private Float st_spalnic;
    private Float st_kopalnic;
    private Float leto_izgradnje;
    private Float st_nadstropij;
    private Float velikost_zemljisca;
    private Float velikost_skupaj;
    private String id_nepremicnine;
    private List<String> image_urls;
    private String opis;
    private String leto_obnove;
    private String agencija;
    private List<String> lastnosti;
}
