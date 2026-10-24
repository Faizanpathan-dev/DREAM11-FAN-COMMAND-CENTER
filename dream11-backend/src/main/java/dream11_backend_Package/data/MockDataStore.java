package dream11_backend_Package.data;

import java.util.List;

import org.springframework.stereotype.Component;

import dream11_backend_Package.model.BallEvent;
import dream11_backend_Package.model.MatchState;
import dream11_backend_Package.model.Player;


@Component 

public class MockDataStore implements MatchDataSource{



    private final MatchDataSimulation simulation;

    private final List<BallEvent> balls;

    private int currentballIndex = 0 ; 


    public MockDataStore(MatchDataSimulation simulation) {
        this.simulation = simulation;
        this.balls = simulation.getMatchDeliveries();
    }


   public  double getParRunRate(){
   return  simulation.getParRunRate();

    }

    public BallEvent getNextBall() {

    if(currentballIndex < balls.size()){

            return  balls.get(currentballIndex++);
    }

    
    
        currentballIndex = 0 ; 
    return  balls.get(currentballIndex++);
        
    }


    @Override
    public MatchState getCurrentMatchState() {
        int lastIndex = Math.max(0, currentballIndex - 1);

         BallEvent latest = balls.get(lastIndex);
         
                int target;
        String summary;
        if (latest.getInnings() == 1) {
            // 🟢 1st Innings: No target yet, calculate projected score!
            target = 0;
            int projectedScore = (int) Math.round(latest.getCrr() * 20.0);
            summary = simulation.getTEAM1() + " batting first | Projected: " + projectedScore;
        } else {
            // 🟢 2nd Innings: Chasing the target
            target = simulation.getTARGET();
            int runsNeeded = target - latest.getTotalScore();
            summary = (runsNeeded > 0)
                    ? simulation.getTEAM1() + " need " + runsNeeded + " runs to win"
                    : simulation.getTEAM1() + " won the match!";
        }
        return new MatchState(
                simulation.getTEAM1(),
                simulation.getTEAM2(),
                simulation.getVENUE(),
                target,
                latest.getTotalScore(),
                latest.getWickets(),
                latest.getOver(),
                latest.getCrr(),
                latest.getRrr(),
                75,
                summary
        );
    }

    @Override
    public List<Player> getAllPlayers() {
        return simulation.getFantasySquad();
    }
    @Override
    public List<BallEvent> getAllBallEvents() {
        return balls;
    }
}