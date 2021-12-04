namespace ChatHost.Logic;

public interface IChatRoomManager
{
    void ConnectToChat(string connectionId, string chatId);

    string? GetChatByClient(string connectionId);
}