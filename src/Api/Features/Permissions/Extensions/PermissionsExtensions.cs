using Api.Features.Permissions.Models;

namespace Api.Features.Permissions.Extensions;

public static class PermissionsExtensions
{
    public static string GetPermissionPolicy(string permissionName)
    {
        return $"{PolicyConstants.PermissionPolicyPrefix}{permissionName}";
    }
}