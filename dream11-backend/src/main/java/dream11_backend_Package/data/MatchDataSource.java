package dream11_backend_Package.data;

import java.util.List;

import dream11_backend_Package.model.BallEvent;
import dream11_backend_Package.model.MatchState;
import dream11_backend_Package.model.Player;

public interface MatchDataSource {

    BallEvent getNextBall();

    MatchState getCurrentMatchState();


    List<Player> getAllPlayers();


    List<BallEvent> getAllBallEvents();

    double getParRunRate();


}
