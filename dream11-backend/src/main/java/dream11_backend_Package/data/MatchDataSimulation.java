package dream11_backend_Package.data;

import dream11_backend_Package.model.BallEvent;
import dream11_backend_Package.model.Player;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component 
@Getter 
public class MatchDataSimulation {

    // --- Public Constants ---
    private final String TEAM1 = "India";
    private final String TEAM2 = "New Zealand";
    private final String VENUE = "Wankhede Stadium, Mumbai";
    private final int TARGET = 185;
    private final double parRunRate = 9.0; 

    // Constructor: BallEvent(int innings, double over, String batsman, String bowler, int runs, 
    //                        boolean isWicket, int totalScore, int wickets, double crr, double rrr)
    private List<BallEvent> matchDeliveries = Arrays.asList(
            // --- Over 18 ---
            new BallEvent(2, 18.1, "Hardik", "Southee", 1, false, 160, 4, 8.8, 13.6),
            new BallEvent(2, 18.2, "Jadeja", "Southee", 4, false, 164, 4, 8.9, 12.6),
            new BallEvent(2, 18.3, "Jadeja", "Southee", 0, false, 164, 4, 8.8, 14.0),
            new BallEvent(2, 18.4, "Jadeja", "Southee", 6, false, 170, 4, 9.1, 11.2),
            new BallEvent(2, 18.5, "Jadeja", "Southee", 0, true, 170, 5, 9.0, 12.8),
            new BallEvent(2, 18.6, "Axar Patel", "Southee", 2, false, 172, 5, 9.0, 13.0),
            
            // --- Over 19 (High pressure, 13 runs needed from 12 balls) ---
            new BallEvent(2, 19.1, "Axar Patel", "Ferguson", 1, false, 173, 5, 9.0, 13.0),
            new BallEvent(2, 19.2, "Hardik", "Ferguson", 4, false, 177, 5, 9.2, 9.6),
            new BallEvent(2, 19.3, "Hardik", "Ferguson", 0, false, 177, 5, 9.1, 12.0),
            new BallEvent(2, 19.4, "Hardik", "Ferguson", 6, false, 183, 5, 9.4, 3.0),
            new BallEvent(2, 19.5, "Hardik", "Ferguson", 0, true, 183, 6, 9.3, 3.5), // WICKET!
            new BallEvent(2, 19.6, "KL Rahul", "Ferguson", 0, false, 183, 6, 9.2, 4.0),
            
            // --- Over 20 (The Finish, 2 runs needed from 6 balls) ---
            new BallEvent(2, 20.1, "KL Rahul", "Boult", 1, false, 184, 6, 9.2, 1.0),
            new BallEvent(2, 20.2, "Axar Patel", "Boult", 2, false, 186, 6, 9.3, 0.0) // INDIA WINS
    );
    
    // Constructor: Player(String name, String team, String role, double credits, int currentPoints, 
    //                     int projectedPoints, boolean isCaptain, boolean isViceCaptain, String recommendation)
    private List<Player> fantasySquad = Arrays.asList(
            // Core 5
            new Player("Hardik Pandya", TEAM1, "ALL", 9.0, 78, 120, false, false, "MAKE_CAPTAIN"),
            new Player("Ravindra Jadeja", TEAM1, "ALL", 8.5, 62, 95, false, false, "MAKE_VC"),
            new Player("Rohit Sharma", TEAM1, "BAT", 9.5, 54, 54, true, false, "SAFE_HOLD"),
            new Player("Virat Kohli", TEAM1, "BAT", 10.0, 48, 48, false, true, "SAFE_HOLD"),
            new Player("Trent Boult", TEAM2, "BOWL", 8.5, 75, 85, false, false, "SAFE_HOLD"),
            
            // 6 Additional Players to complete a full 11-man Fantasy Lineup
            new Player("Jasprit Bumrah", TEAM1, "BOWL", 9.0, 85, 110, false, false, "MUST_HAVE"),
            new Player("KL Rahul", TEAM1, "WK", 8.5, 42, 60, false, false, "SAFE_HOLD"),
            new Player("Axar Patel", TEAM1, "ALL", 8.0, 50, 75, false, false, "DIFFERENTIAL_PICK"),
            new Player("Kane Williamson", TEAM2, "BAT", 9.5, 68, 72, false, false, "SAFE_HOLD"),
            new Player("Devon Conway", TEAM2, "WK", 9.0, 92, 105, false, false, "MAKE_VC"),
            new Player("Lockie Ferguson", TEAM2, "BOWL", 8.5, 45, 55, false, false, "RISKY_PICK")
    );
}