using Api.Features.Permissions.Extensions;
using Api.Features.Permissions.Options;
using Common.Infrastructure.Database;
using Common.Infrastructure.Database.Entities.Permissions;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace Api.Features.Users.Services;

public class UserService(
    ILogger<UserService> logger,
    IMemoryCache cache,
    IOptions<UserCacheOptions> cacheOptions)
    : IUserService
{
    private readonly ILogger<UserService> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly IMemoryCache _userCache = cache ?? throw new ArgumentNullException(nameof(cache));
    private readonly UserCacheOptions _cacheOptions = cacheOptions.Value ?? throw new ArgumentNullException(nameof(cacheOptions));

    public User? GetCurrentUser(string userPrincipalName)
    {
        var cachedUser = _userCache.GetCacheValue<User>(userPrincipalName);
        if (cachedUser is not null)
        {
            return cachedUser;
        }

        _logger.LogInformation("Cache miss on finding user '{@User}'", userPrincipalName);
        RefreshCache(userPrincipalName);
        cachedUser = _userCache.GetCacheValue<User>(userPrincipalName);
        return cachedUser;
    }

    public bool UserExists(string userPrincipalName)
    {
        var cachedUser = _userCache.GetCacheValue<User>(userPrincipalName);
        if (cachedUser is not null)
        {
            return true;
        }

        _logger.LogInformation("Cache miss on finding user '{@User}'", userPrincipalName);
        RefreshCache(userPrincipalName);
        cachedUser = _userCache.GetCacheValue<User>(userPrincipalName);
        return cachedUser is not null;
    }

    private void RefreshCache(string userPrincipalName)
    {
        var user = Database.Users.FirstOrDefault(u => u.UserPrincipalName == userPrincipalName);
        _userCache.SetCacheValue(userPrincipalName, user, _cacheOptions.CacheExpirationMinutes);
    }
}