package dream11_backend_Package.data;

import java.util.List;

import dream11_backend_Package.model.BallEvent;
import dream11_backend_Package.model.MatchState;
import dream11_backend_Package.model.Player;

public interface MatchDataSource {


        // Get the next live ball delivery
    BallEvent getNextBall();
    // Get current match scoreboard state
    MatchState getCurrentMatchState();
    
    // Get all fantasy players for Dream Team Rescue
    List<Player> getAllPlayers();

    // Get all historical ball events of the match
    List<BallEvent> getAllBallEvents();

    double getParRunRate();


}
