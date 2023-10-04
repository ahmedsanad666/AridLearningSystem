using Microsoft.AspNetCore.SignalR;

namespace webapi.Hubs
{
    public class UserHub : Hub
    {
        // porps
        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;
        // methods


        public override Task OnConnectedAsync()
        {
         
            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();

                return base.OnDisconnectedAsync(exception);
        }

      
        public async Task newWindowLoaded()
        {
            TotalViews++;

            // tell all the clients that the user increased .. send the update to ui

            await Clients.All.SendAsync("updateTotalViews", TotalViews);
        }
    
    }


}
