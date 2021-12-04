using System.Collections.Concurrent;

namespace ChatHost.Logic;

public class ChatRoomManager : IChatRoomManager
{
    private readonly ConcurrentDictionary<string, string> _connectedClientsToChats;

    public ChatRoomManager()
    {
        _connectedClientsToChats = new();
    }

    public void ConnectToChat(string connectionId, string chatId)
    {
        _connectedClientsToChats[connectionId] = chatId;
    }

    public string? GetChatByClient(string connectionId)
    {
        if (!_connectedClientsToChats.ContainsKey(connectionId))
        {
            return null;
        }
        else
        {
            return _connectedClientsToChats[connectionId];
        }
    }
}