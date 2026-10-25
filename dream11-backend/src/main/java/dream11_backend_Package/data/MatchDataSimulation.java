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


    private final String TEAM1 = "India";
    private final String TEAM2 = "New Zealand";
    private final String VENUE = "Wankhede Stadium, Mumbai";
    private final int TARGET = 185;
    private final double parRunRate = 9.0;

   private List<BallEvent> matchDeliveries = Arrays.asList(

            new BallEvent(1, 15.1, "Kane Williamson", "Axar Patel", 1, false, 133, 3, 8.77, 0.0),
            new BallEvent(1, 15.2, "Devon Conway", "Axar Patel", 4, false, 137, 3, 8.93, 0.0),
            new BallEvent(1, 15.3, "Devon Conway", "Axar Patel", 0, false, 137, 3, 8.84, 0.0),
            new BallEvent(1, 15.4, "Devon Conway", "Axar Patel", 2, false, 139, 3, 8.87, 0.0),
            new BallEvent(1, 15.5, "Devon Conway", "Axar Patel", 1, false, 140, 3, 8.84, 0.0),
            new BallEvent(1, 15.6, "Kane Williamson", "Axar Patel", 4, false, 144, 3, 9.00, 0.0),


            new BallEvent(1, 16.1, "Devon Conway", "Hardik", 6, false, 150, 3, 9.28, 0.0),
            new BallEvent(1, 16.2, "Devon Conway", "Hardik", 1, false, 151, 3, 9.25, 0.0),
            new BallEvent(1, 16.3, "Kane Williamson", "Hardik", 0, true, 151, 4, 9.15, 0.0),
            new BallEvent(1, 16.4, "Glenn Phillips", "Hardik", 1, false, 152, 4, 9.12, 0.0),
            new BallEvent(1, 16.5, "Devon Conway", "Hardik", 4, false, 156, 4, 9.27, 0.0),
            new BallEvent(1, 16.6, "Devon Conway", "Hardik", 1, false, 157, 4, 9.24, 0.0),


            new BallEvent(1, 17.1, "Devon Conway", "Bumrah", 0, false, 157, 4, 9.15, 0.0),
            new BallEvent(1, 17.2, "Devon Conway", "Bumrah", 1, false, 158, 4, 9.12, 0.0),
            new BallEvent(1, 17.3, "Glenn Phillips", "Bumrah", 2, false, 160, 4, 9.14, 0.0),
            new BallEvent(1, 17.4, "Glenn Phillips", "Bumrah", 0, true, 160, 5, 9.06, 0.0),
            new BallEvent(1, 17.5, "Daryl Mitchell", "Bumrah", 0, false, 160, 5, 8.97, 0.0),
            new BallEvent(1, 17.6, "Daryl Mitchell", "Bumrah", 1, false, 161, 5, 8.94, 0.0),


            new BallEvent(1, 18.1, "Daryl Mitchell", "Hardik", 4, false, 165, 5, 9.08, 0.0),
            new BallEvent(1, 18.2, "Daryl Mitchell", "Hardik", 6, false, 171, 5, 9.33, 0.0),
            new BallEvent(1, 18.3, "Daryl Mitchell", "Hardik", 1, false, 172, 5, 9.30, 0.0),
            new BallEvent(1, 18.4, "Devon Conway", "Hardik", 2, false, 174, 5, 9.32, 0.0),
            new BallEvent(1, 18.5, "Devon Conway", "Hardik", 4, false, 178, 5, 9.45, 0.0),
            new BallEvent(1, 18.6, "Devon Conway", "Hardik", 0, true, 178, 6, 9.37, 0.0),


            new BallEvent(1, 19.1, "Daryl Mitchell", "Bumrah", 1, false, 179, 6, 9.34, 0.0),
            new BallEvent(1, 19.2, "Mitchell Santner", "Bumrah", 0, false, 179, 6, 9.26, 0.0),
            new BallEvent(1, 19.3, "Mitchell Santner", "Bumrah", 2, false, 181, 6, 9.28, 0.0),
            new BallEvent(1, 19.4, "Mitchell Santner", "Bumrah", 0, false, 181, 6, 9.20, 0.0),
            new BallEvent(1, 19.5, "Mitchell Santner", "Bumrah", 1, false, 182, 6, 9.18, 0.0),
            new BallEvent(1, 19.6, "Daryl Mitchell", "Bumrah", 2, false, 184, 6, 9.20, 0.0),

            new BallEvent(2, 0.1, "Rohit Sharma", "Boult", 0, false, 0, 0, 0.00, 9.33),
            new BallEvent(2, 0.2, "Rohit Sharma", "Boult", 4, false, 4, 0, 12.00, 9.20),
            new BallEvent(2, 0.3, "Rohit Sharma", "Boult", 0, false, 4, 0, 8.00, 9.28),
            new BallEvent(2, 0.4, "Rohit Sharma", "Boult", 1, false, 5, 0, 7.50, 9.31),
            new BallEvent(2, 0.5, "Shubman Gill", "Boult", 0, false, 5, 0, 6.00, 9.39),
            new BallEvent(2, 0.6, "Shubman Gill", "Boult", 4, false, 9, 0, 9.00, 9.26),


            new BallEvent(2, 1.1, "Rohit Sharma", "Southee", 6, false, 15, 0, 12.86, 9.03),
            new BallEvent(2, 1.2, "Rohit Sharma", "Southee", 1, false, 16, 0, 12.00, 9.05),
            new BallEvent(2, 1.3, "Shubman Gill", "Southee", 2, false, 18, 0, 12.00, 9.03),
            new BallEvent(2, 1.4, "Shubman Gill", "Southee", 0, false, 18, 0, 10.80, 9.11),
            new BallEvent(2, 1.5, "Shubman Gill", "Southee", 1, false, 19, 0, 10.36, 9.14),
            new BallEvent(2, 1.6, "Rohit Sharma", "Southee", 4, false, 23, 0, 11.50, 9.00),


            new BallEvent(2, 2.1, "Shubman Gill", "Boult", 0, false, 23, 0, 10.62, 9.08),
            new BallEvent(2, 2.2, "Shubman Gill", "Boult", 0, true, 23, 1, 9.86, 9.17),
            new BallEvent(2, 2.3, "Virat Kohli", "Boult", 4, false, 27, 1, 10.80, 9.03),
            new BallEvent(2, 2.4, "Virat Kohli", "Boult", 0, false, 27, 1, 10.13, 9.12),
            new BallEvent(2, 2.5, "Virat Kohli", "Boult", 1, false, 28, 1, 9.88, 9.15),
            new BallEvent(2, 2.6, "Rohit Sharma", "Boult", 0, false, 28, 1, 9.33, 9.24),


            new BallEvent(2, 3.1, "Virat Kohli", "Ferguson", 1, false, 29, 1, 9.16, 9.27),
            new BallEvent(2, 3.2, "Rohit Sharma", "Ferguson", 4, false, 33, 1, 9.90, 9.12),
            new BallEvent(2, 3.3, "Rohit Sharma", "Ferguson", 6, false, 39, 1, 11.14, 8.85),
            new BallEvent(2, 3.4, "Rohit Sharma", "Ferguson", 0, false, 39, 1, 10.64, 8.94),
            new BallEvent(2, 3.5, "Rohit Sharma", "Ferguson", 1, false, 40, 1, 10.43, 8.97),
            new BallEvent(2, 3.6, "Virat Kohli", "Ferguson", 2, false, 42, 1, 10.50, 8.94),


            new BallEvent(2, 4.1, "Rohit Sharma", "Boult", 4, false, 46, 1, 11.04, 8.78),
            new BallEvent(2, 4.2, "Rohit Sharma", "Boult", 0, true, 46, 2, 10.62, 8.87),
            new BallEvent(2, 4.3, "Suryakumar Yadav", "Boult", 0, false, 46, 2, 10.22, 8.97),
            new BallEvent(2, 4.4, "Suryakumar Yadav", "Boult", 4, false, 50, 2, 10.71, 8.80),
            new BallEvent(2, 4.5, "Suryakumar Yadav", "Boult", 1, false, 51, 2, 10.55, 8.83),
            new BallEvent(2, 4.6, "Virat Kohli", "Boult", 1, false, 52, 2, 10.40, 8.87),

            new BallEvent(2, 17.1, "Hardik", "Southee", 1, false, 160, 4, 8.8, 13.6),
            new BallEvent(2, 17.2, "Jadeja", "Southee", 4, false, 164, 4, 8.9, 12.6),
            new BallEvent(2, 17.3, "Jadeja", "Southee", 0, false, 164, 4, 8.8, 14.0),
            new BallEvent(2, 17.4, "Jadeja", "Southee", 6, false, 170, 4, 9.1, 11.2),
            new BallEvent(2, 17.5, "Jadeja", "Southee", 0, true, 170, 5, 9.0, 12.8),
            new BallEvent(2, 17.6, "Axar Patel", "Southee", 2, false, 172, 5, 9.0, 13.0),


            new BallEvent(2, 18.1, "Axar Patel", "Ferguson", 1, false, 173, 5, 9.0, 13.0),
            new BallEvent(2, 18.2, "Hardik", "Ferguson", 4, false, 177, 5, 9.2, 9.6),
            new BallEvent(2, 18.3, "Hardik", "Ferguson", 0, false, 177, 5, 9.1, 12.0),
            new BallEvent(2, 18.4, "Hardik", "Ferguson", 6, false, 183, 5, 9.4, 3.0),
            new BallEvent(2, 18.5, "Hardik", "Ferguson", 0, true, 183, 6, 9.3, 3.5),
            new BallEvent(2, 18.6, "KL Rahul", "Ferguson", 0, false, 183, 6, 9.2, 4.0),


            new BallEvent(2, 19.1, "KL Rahul", "Boult", 1, false, 184, 6, 9.2, 1.0),
            new BallEvent(2, 19.2, "Axar Patel", "Boult", 2, false, 186, 6, 9.3, 0.0)
    );

    private List<Player> fantasySquad = Arrays.asList(
            new Player("Hardik Pandya", TEAM1, "ALL", 9.0, 78, 120, false, false, "MAKE_CAPTAIN"),
            new Player("Ravindra Jadeja", TEAM1, "ALL", 8.5, 62, 95, false, false, "MAKE_VC"),
            new Player("Rohit Sharma", TEAM1, "BAT", 9.5, 54, 54, true, false, "SAFE_HOLD"),
            new Player("Virat Kohli", TEAM1, "BAT", 10.0, 48, 48, false, true, "SAFE_HOLD"),
            new Player("Trent Boult", TEAM2, "BOWL", 8.5, 75, 85, false, false, "SAFE_HOLD"),
            new Player("Jasprit Bumrah", TEAM1, "BOWL", 9.0, 85, 110, false, false, "MUST_HAVE"),
            new Player("KL Rahul", TEAM1, "WK", 8.5, 42, 60, false, false, "SAFE_HOLD"),
            new Player("Axar Patel", TEAM1, "ALL", 8.0, 50, 75, false, false, "DIFFERENTIAL_PICK"),
            new Player("Kane Williamson", TEAM2, "BAT", 9.5, 68, 72, false, false, "SAFE_HOLD"),
            new Player("Devon Conway", TEAM2, "WK", 9.0, 92, 105, false, false, "MAKE_VC"),
            new Player("Lockie Ferguson", TEAM2, "BOWL", 8.5, 45, 55, false, false, "RISKY_PICK")
    );

}
