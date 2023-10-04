using Microsoft.AspNetCore.SignalR;

namespace webapi.Hubs
{
    public class LiveQuizHub : Hub
    {
        private static Dictionary<string, string> connectedUsers = new Dictionary<string, string>();
        private static string AdminConnectionId = "";
        private static bool quizStarted = false;
        private static int CurrentQuestionNumber = 0;
        private static readonly List<UserAnswer> UserAnswers = new List<UserAnswer>();


        public async Task SubmitAnswer(string userName, string answer,string RightAnsNum)
        {
            var userAnswer = new UserAnswer
            {
                UserName = userName,
                Answer = answer,
                RightAnsNum = RightAnsNum
            };

            UserAnswers.Add(userAnswer);


            await Clients.Client(AdminConnectionId).SendAsync("UpdateUserAnswer", UserAnswers);
        }


        public async Task RegisterUser(string username , string role)
        {

            if (role == "admin")
            {
                AdminConnectionId = Context.ConnectionId;
            }
            else
            {
                if (quizStarted)
                {
                    await Clients.AllExcept(AdminConnectionId).SendAsync("AlreadyStarted", true);
                }
              var connectionId = Context.ConnectionId;

            if (!connectedUsers.ContainsKey(connectionId))
            {
            connectedUsers.Add(connectionId, username);
            }
            
            }

            await Clients.Client(AdminConnectionId).SendAsync("UserConnected", connectedUsers);

        
         
           

        }


        public async Task EndQuiz()
        {
            await Clients.AllExcept(AdminConnectionId).SendAsync("endQuiz");
        }
        public async Task NextQuestion()
        {
            CurrentQuestionNumber++;
            UserAnswers.Clear();
            await Clients.All.SendAsync("CurrentQuestionNumber", CurrentQuestionNumber);
        }
        public async Task StartQuiz()
        {
            quizStarted = true;
            await Clients.All.SendAsync("Started",quizStarted);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;

            if (connectedUsers.ContainsKey(connectionId))
            {
                var username = connectedUsers[connectionId];
                connectedUsers.Remove(connectionId);

                // If this is the admin, send the updated list of connected users

                await Clients.Client(AdminConnectionId).SendAsync("UserConnected", connectedUsers);

            }

            await base.OnDisconnectedAsync(exception);
        }

    }
}
