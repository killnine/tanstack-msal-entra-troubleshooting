using Api.Features.Permissions.Requests;
using Common.Infrastructure.Database.Entities.Permissions;

namespace Api.Features.Permissions.Services.Abstractions;

public interface IPermissionService
{
    IReadOnlyList<Permission> Retrieve();

    IEnumerable<Permission> Retrieve(RetrievePermissionRequest request, CancellationToken cancellationToken);

    bool HasPermission(Guid objectId, Permission permission, CancellationToken cancellationToken);

    bool HasAnyPermission(Guid objectId, IEnumerable<Permission> permission, CancellationToken cancellationToken);

    bool HasAllPermissions(Guid objectId, IEnumerable<Permission> permission, CancellationToken cancellationToken);

    bool HasPermission(Guid objectId, string permission, CancellationToken cancellationToken);

    bool HasAnyPermission(Guid objectId, IEnumerable<string> permission, CancellationToken cancellationToken);

    bool HasAllPermissions(Guid objectId, IEnumerable<string> permission, CancellationToken cancellationToken);

    bool HasPermission(string? userPrincipalName, string permission, CancellationToken cancellationToken);
}