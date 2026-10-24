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

    private String name;               // e.g. "Rohit Sharma"
    private String team;                // e.g. "IND" or "NZ"
    private String role;                // e.g. "BAT", "BOWL", "ALL", "WK"
    private double credits;             // e.g. 9.5
    private int currentPoints;          // Live Dream11 Fantasy Points (e.g. 68)
    private int projectedPoints;        // AI predicted points (e.g. 112)
    private boolean isCaptain;          // 2x points multiplier
    private boolean isViceCaptain;      // 1.5x points multiplier
    private String recommendation;  
    
    // e.g. "MAKE_CAPTAIN", "SAFE_PICK", "RISKY"



    

}
