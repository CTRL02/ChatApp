using chatbot.Models;
using chatbot.SharedData;
using Microsoft.AspNetCore.SignalR;

namespace chatbot.Hubs
{
    public class ChatHub:Hub
    {
        private readonly concMemory _connections;
        public ChatHub(concMemory connections)
        { 
            _connections = connections;
        }
        public async Task JoinChatRoom(UserConnection conn)
        {
            await Clients.All.SendAsync("ReceiveMessageGeneral", "admin", $"{conn.Username} has joined");
        }
        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
            _connections.connections[Context.ConnectionId] = conn;
            await Clients.Group(conn.Chatroom).SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined {conn.Chatroom}");
        }
        public async Task SendMessage(string message)
        {
            if(_connections.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
                await Clients.Group(conn.Chatroom).SendAsync("ReceiveSpecificMessage", conn.Username, message);

        }
    }
}
