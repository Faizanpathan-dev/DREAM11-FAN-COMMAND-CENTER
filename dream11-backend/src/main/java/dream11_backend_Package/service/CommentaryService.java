package dream11_backend_Package.service;

import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import dream11_backend_Package.data.MatchDataSource;
import dream11_backend_Package.model.BallEvent;
import lombok.RequiredArgsConstructor;

@Service 


public class CommentaryService {

private final ChatClient chatClient;

private final MatchDataSource dataSource;

public CommentaryService(ChatClient.Builder chatClientBuilder , MatchDataSource matchDataSource){


    this.chatClient = chatClientBuilder.build();
    this.dataSource = matchDataSource;
}


public  String generateCommentary(String person , BallEvent ball){

String prompt = prompt(person, ball);
  try{
     
    
    return chatClient.prompt()
    .user(prompt)
    .call()
    .content();

}
catch(Exception e ){

e.printStackTrace();
System.out.println(e.getMessage());

return  getFallback(person,ball);

}

}


public String prompt (String person, BallEvent ball){

    return "your are a cricket commentator wit a "+ person + "personality "+
        "context : over " + "Context: Over " + ball.getOver() + ", Bowler: " + ball.getBowler() 
                + ", Batsman: " + ball.getBatsman() + ", Runs scored: " + ball.getRuns() + (ball.isWicket() ? "Wicket just fell !" : "")
                +"Generate exactly 1 or 2 punchy immersive sentences of commentary matching your persona.";

                }


        private String getFallback(String person, BallEvent ball) {
        if (ball.isWicket()) {
            return "OUT! " + ball.getBatsman() + " is dismissed by " + ball.getBowler() + "! Huge breakthrough!";
        } else if (ball.getRuns() == 6) {
            return "SIX! Dispatched into the stands by " + ball.getBatsman() + "! Incredible stroke!";
        } else if (ball.getRuns() == 4) {
            return "FOUR! Beautifully timed to the boundary ropes by " + ball.getBatsman() + "!";
        }
        return ball.getBatsman() + " pushes it into the gap off " + ball.getBowler() + " for " + ball.getRuns() + " run(s).";
    }





    
}


