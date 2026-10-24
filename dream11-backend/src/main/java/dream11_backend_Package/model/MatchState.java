package dream11_backend_Package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor 
@Getter
@Setter
@ToString
public class MatchState {
  

    private String team1;
    private String team2 ;

    private String veanue;
    
    private int target;

    private int currentScore;      
    private int wickets;            
    private double currentOver;     
    private double crr;             
    private double rrr;             
    private int currentPressure;    
    private String statusMessage;


}
