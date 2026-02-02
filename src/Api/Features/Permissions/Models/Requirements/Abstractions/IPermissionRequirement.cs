using Microsoft.AspNetCore.Authorization;

namespace Api.Features.Permissions.Models.Requirements.Abstractions;

public interface IPermissionRequirement : IAuthorizationRequirement
{
    public bool RequiresAll { get; }

    public IEnumerable<string> GetPermissions();
}