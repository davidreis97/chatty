using Ardalis.GuardClauses;
using ChatHost.Logic;
using Microsoft.AspNetCore.SignalR;

namespace ChatHost.Hubs;

public class ChatHub : Hub
{
    private readonly IChatRoomManager _chatRoomManager;

    public ChatHub(IChatRoomManager chatRoomManager)
    {
        Guard.Against.Null(chatRoomManager, nameof(chatRoomManager));
        _chatRoomManager = chatRoomManager;
    }

    public async void ConnectToChat(string chatId)
    {
        _chatRoomManager.ConnectToChat(Context.ConnectionId, chatId);
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
    }

    public async Task SendMessage(string message)
    {
        var chatId = _chatRoomManager.GetChatByClient(Context.ConnectionId);
        if (string.IsNullOrEmpty(chatId)) 
        {
            Context.Abort();
            return;
        }

        var othersInChat = Clients.OthersInGroup(chatId);
        await othersInChat.SendAsync("ReceiveMessage", new ChatMessage() { message=message, username=Context.ConnectionId});
    }

    public struct ChatMessage
    {
        public string username { get; set; }
        public string message { get; set; }
    }
}