using Api.Features.Permissions.Models.Requirements.Abstractions;

namespace Api.Features.Permissions.Models.Requirements;

public class HasPermissionRequirement : IPermissionRequirement
{
    private readonly IEnumerable<string> _permissions;

    public HasPermissionRequirement(string permission)
    {
        _permissions = new List<string> { permission };
    }

    public bool RequiresAll => true;

    public IEnumerable<string> GetPermissions() => _permissions;
}