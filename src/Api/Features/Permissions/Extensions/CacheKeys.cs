namespace Api.Features.Permissions.Extensions;

public static class CacheKeys
{
    public static string UserPermissionsCacheKey(Guid userId)
    {
        return $"UserPermissions-{userId}";
    }
}