using Common.Infrastructure.Database.Entities.Permissions;

namespace Api.Features.Users.Services;

public interface IUserService
{
    bool UserExists(string userPrincipalName);

    User? GetCurrentUser(string userPrincipalName);
}