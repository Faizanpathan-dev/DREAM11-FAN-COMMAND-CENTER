package dream11_backend_Package.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import dream11_backend_Package.data.MatchDataSource;
import dream11_backend_Package.model.BallEvent;
import lombok.RequiredArgsConstructor;

@Service 

public class CatchUpService {

private final ChatClient chatClient; 

private  final MatchDataSource dataSource;



public CatchUpService(ChatClient.Builder chatcBuilder , MatchDataSource dataSource){

this.chatClient = chatcBuilder.build();
this.dataSource = dataSource;

}





public String catchUp(int targetOver){
List<BallEvent> targBallEvents = new ArrayList<>();

 List<BallEvent> allover = dataSource.getAllBallEvents();
;

for (BallEvent ball : allover ){

    if((int)ball.getOver() == targetOver){

        targBallEvents.add(ball);
    }


}

  if (targBallEvents.isEmpty()) {

            return "No deliveries recorded yet for Over " + targetOver;

        }


 String catchUpPromt  = "give me sumary of this over "+targBallEvents.toString();

try {
            return chatClient.prompt()
                    .user(catchUpPromt)
                    .call()
                    .content();
        } catch (Exception e) {
            System.out.println("CatchUp AI error: " + e.getMessage());
            return "Over " + targetOver + " produced " + targBallEvents.size() + " intense deliveries!";
        }


}

}
