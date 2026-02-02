using Api.Features.Permissions.Extensions;
using Api.Features.Permissions.Options;
using Api.Features.Permissions.Requests;
using Api.Features.Permissions.Services.Abstractions;
using Api.Features.Users.Services;
using Common.Infrastructure.Database;
using Common.Infrastructure.Database.Entities.Permissions;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace Api.Features.Permissions.Services;

public class PermissionService(
    IMemoryCache cache,
    IOptions<PermissionCacheOptions> cacheOptions,
    IUserService userService)
    : IPermissionService
{
    private readonly IMemoryCache _cache = cache ?? throw new ArgumentNullException(nameof(cache));
    private readonly IUserService _userService = userService ?? throw new ArgumentNullException(nameof(userService));
    private readonly PermissionCacheOptions _cacheOptions = cacheOptions.Value ?? throw new ArgumentNullException(nameof(cacheOptions));

    public IReadOnlyList<Permission> Retrieve() => Database.Permissions;

    public IEnumerable<Permission> Retrieve(RetrievePermissionRequest request, CancellationToken cancellationToken)
    {
        if (request.UserObjectId.HasValue)
        {
            var userPermissions = Database.Users.Where(u => u.ObjectId == request.UserObjectId.Value);
            return userPermissions.SelectMany(u => u.Roles.SelectMany(r => r.Permissions));
        }

        if (request.Ids != null)
        {
            var allPermissions = Retrieve();
            var requestedPermissions = allPermissions.Where(t => request.Ids.Contains(t.Id)).Distinct();
            return requestedPermissions;
        }

        return new List<Permission>();
    }

    public bool HasPermission(Guid userId, Permission permission, CancellationToken cancellationToken) =>
        HasPermission(userId, permission.ToString()!, cancellationToken);

    public bool HasAnyPermission(Guid userId, IEnumerable<Permission> permissions, CancellationToken cancellationToken) =>
        HasAnyPermission(userId, permissions.Select(t => t.ToString())!, cancellationToken);

    public bool HasAllPermissions(Guid userId, IEnumerable<Permission> permissions, CancellationToken cancellationToken) =>
        HasAllPermissions(userId, permissions.Select(t => t.ToString())!, cancellationToken);

    public bool HasPermission(string? userPrincipalName, string permission, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(userPrincipalName))
        {
            return false;
        }

        var user = _userService.GetCurrentUser(userPrincipalName);
        if (user is null)
        {
            return false;
        }

        return HasPermission(user.ObjectId, permission, cancellationToken);
    }

    public bool HasPermission(Guid userId, string permission, CancellationToken cancellationToken)
    {
        var hasPermission = HasPermissionInCache();
        if (hasPermission)
        {
            return true;
        }

        RefreshCache(userId, cancellationToken);
        return HasPermissionInCache();

        bool HasPermissionInCache()
        {
            var cacheValue = _cache.GetCacheValue<List<string>>(CacheKeys.UserPermissionsCacheKey(userId));
            return cacheValue?.Contains(permission) == true;
        }
    }

    public bool HasAnyPermission(Guid userId, IEnumerable<string> permissions, CancellationToken cancellationToken)
    {
        var requiredPermissions = permissions.ToList();
        var cachedPermissions = GetCachedPermissions(userId, cancellationToken);
        if (cachedPermissions.Intersect(requiredPermissions).IsNotEmpty())
        {
            return true;
        }

        RefreshCache(userId, cancellationToken);
        cachedPermissions = GetCachedPermissions(userId, cancellationToken);
        return cachedPermissions.Intersect(requiredPermissions).IsNotEmpty();
    }

    public bool HasAllPermissions(Guid userId, IEnumerable<string> permissions, CancellationToken cancellationToken)
    {
        var requiredPermissions = permissions.ToList();
        var cachedPermissions = GetCachedPermissions(userId, cancellationToken);
        if (cachedPermissions.Intersect(requiredPermissions).Count() == requiredPermissions.Count)
        {
            return true;
        }

        RefreshCache(userId, cancellationToken);
        cachedPermissions = GetCachedPermissions(userId, cancellationToken);
        return cachedPermissions.Intersect(requiredPermissions).Count() == requiredPermissions.Count;
    }

    private List<string> GetCachedPermissions(Guid userId, CancellationToken cancellationToken)
    {
        var cachedPermissions = _cache.GetCacheValue<List<string>>(CacheKeys.UserPermissionsCacheKey(userId));
        if (cachedPermissions == null)
        {
            RefreshCache(userId, cancellationToken);
            cachedPermissions = _cache.GetCacheValue<List<string>>(CacheKeys.UserPermissionsCacheKey(userId));
        }

        return cachedPermissions ?? [];
    }

    private void RefreshCache(Guid userObjectId, CancellationToken cancellationToken)
    {
        var request = RetrievePermissionRequest.ByObjectId(userObjectId);
        var permissions = Retrieve(request, cancellationToken)
            .Select(t => t.Name.ToString())
            .ToList();
        _cache.SetCacheValue(CacheKeys.UserPermissionsCacheKey(userObjectId), permissions, _cacheOptions.CacheExpirationMinutes);
    }
}