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
public class BallEvent {
      private int innings;
    private double over;
    private String batsman;
    private String bowler;
    private int runs;
    private boolean isWicket;
    private int totalScore;
    private int wickets;
    private double crr;
    private double rrr;

}
