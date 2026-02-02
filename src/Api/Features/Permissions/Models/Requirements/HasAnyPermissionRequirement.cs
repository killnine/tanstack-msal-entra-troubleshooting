using Api.Features.Permissions.Models.Requirements.Abstractions;

namespace Api.Features.Permissions.Models.Requirements;

public class HasAnyPermissionRequirement : IPermissionRequirement
{
    private readonly string[] _permissions;

    public HasAnyPermissionRequirement(string[] permissions)
    {
        _permissions = permissions;
    }

    public bool RequiresAll => false;

    public IEnumerable<string> GetPermissions() => _permissions;
}