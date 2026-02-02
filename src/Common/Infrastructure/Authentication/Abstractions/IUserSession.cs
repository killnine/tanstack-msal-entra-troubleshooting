namespace Common.Infrastructure.Authentication.Abstractions;

public interface IUserSession
{
    string? LoginName { get; set; }

    bool IsAuthenticated { get; set; }
}