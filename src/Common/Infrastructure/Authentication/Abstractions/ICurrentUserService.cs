namespace Common.Infrastructure.Authentication.Abstractions;

public interface ICurrentUserService
{
    IUserSession GetCurrentUser();
}