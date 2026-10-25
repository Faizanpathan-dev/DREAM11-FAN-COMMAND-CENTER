package dream11_backend_Package.service;

import org.springframework.stereotype.Service;

import dream11_backend_Package.data.MatchDataSource;
import dream11_backend_Package.model.BallEvent;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TensionService {


    private final MatchDataSource dataSource;


  public int calculateTension(BallEvent ball){

    if(ball == null ){
        return  50 ;
    }

    double tension = 50.0;

if (ball.getInnings()==2 && ball.getRrr() > 0){

  double ranRateGap = ball.getRrr() - ball.getCrr();

  tension += (ranRateGap *3.5);


}
else{


  double dynamicParRate  = dataSource.getParRunRate();

   double parRunRateGap  = dynamicParRate -ball.getCrr();

    tension += (parRunRateGap *3.5);


}

   tension += (ball.getWickets() * 4.0);

        if (ball.getOver() >= 16.0) {
            tension *= 1.25;
        }


      if (ball.isWicket()){
        tension+=18.0;
      }

      else if (ball.getRuns() == 6 ){
        tension -=8.0;
      }

      else if (ball.getRuns() == 4 ){

        tension -= 4.0;
      }

      else if (ball.getRuns() == 0 && ball.getOver()>15.0){

        tension += 4.0 ;
      }


      int finalScore = (int) Math.round(tension);

return  Math.max(0,Math.min(100,finalScore));


      }

 public String getTensionStatus(int tension) {
        if (tension < 35) return "CALM";
        if (tension < 55) return "STEADY";
        if (tension < 75) return "BUILDING";
        if (tension < 85) return "HIGH TENSION";
        return "CRITICAL CHAOS";
    }

    }
