using Common.Infrastructure.Authentication.Abstractions;

namespace Common.Infrastructure.Authentication.Models;

public class UserSession : IUserSession
{
    public string? LoginName { get; set; }

    public bool IsAuthenticated { get; set; }
}