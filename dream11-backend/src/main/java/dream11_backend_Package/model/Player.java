package dream11_backend_Package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Player {

    private String name;
    private String team;
    private String role;
    private double credits;
    private int currentPoints;
    private int projectedPoints;
    private boolean isCaptain;
    private boolean isViceCaptain;
    private String recommendation;

}
