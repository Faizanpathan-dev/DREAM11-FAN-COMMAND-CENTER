package dream11_backend_Package.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dream11_backend_Package.data.MatchDataSource;
import dream11_backend_Package.data.MockDataStore;
import dream11_backend_Package.model.BallEvent;
import dream11_backend_Package.model.MatchState;
import dream11_backend_Package.model.Player;
import dream11_backend_Package.service.CatchUpService;
import dream11_backend_Package.service.CommentaryService;
import dream11_backend_Package.service.LieDetectorService;
import dream11_backend_Package.service.TensionService;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping ("/api/match")
@CrossOrigin (origins = "*")
@RequiredArgsConstructor
public class MatchApiController {
    private final MatchDataSource dataSource;
    private final TensionService tensionService;
    private final CommentaryService commentaryService;
    private final CatchUpService catchUpService;
    private final LieDetectorService lieDetectorService;

    @GetMapping ("/live")
    public ResponseEntity <Map<String,Object>> getLiveBall(){
       BallEvent nextBall  = dataSource.getNextBall();

      int tension  = tensionService.calculateTension(nextBall);


      String tensionStatus = tensionService.getTensionStatus(tension);

       Map<String, Object> response =  new HashMap<>();

       response.put("ball" ,nextBall);
       response.put("tension", tension);
       response.put("tensionStatus", tensionStatus);


           return  ResponseEntity.ok(response);
    }

     @GetMapping("/state")
    public ResponseEntity<MatchState> getMatchState() {
        return ResponseEntity.ok(dataSource.getCurrentMatchState());
    }

    @GetMapping("/players")
    public ResponseEntity<List<Player>> getPlayers() {
        return ResponseEntity.ok(dataSource.getAllPlayers());
    }

    @GetMapping("/momentum")
    public ResponseEntity<List<BallEvent>> getMomentum() {
        return ResponseEntity.ok(dataSource.getAllBallEvents());
    }

 @GetMapping("/commentary")
    public ResponseEntity<String> getCommentary(@RequestParam String persona) {

        BallEvent currentBall = dataSource.getNextBall();
        String commentary = commentaryService.generateCommentary(persona, currentBall);
        return ResponseEntity.ok(commentary);
    }


    @GetMapping("/catchup/{over}")
public ResponseEntity<String> getCatchUp(@PathVariable int over) {
    return ResponseEntity.ok(catchUpService.catchUp(over));
}
@PostMapping ("/liedetector")
public ResponseEntity<String> verifyClaim(@RequestBody String claim) {
    return ResponseEntity.ok(lieDetectorService.verifyClaim(claim));
}

}
