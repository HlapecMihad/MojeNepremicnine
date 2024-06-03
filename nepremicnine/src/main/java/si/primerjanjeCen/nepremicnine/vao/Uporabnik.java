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
@Document(collection = "uporabniki")
public class Uporabnik {

    @Id
    private int id;
    private String ime;
    private String priimek;
    private String email;
    private String geslo;
}