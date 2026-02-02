using Api.Features.UserRoles.Responses;
using Api.Features.Users.Responses;
using Common.Infrastructure.Database;
using FastEndpoints;

namespace Api.Features.Users.Endpoints;

public class GetUser : EndpointWithoutRequest
{
    public override void Configure()
    {
        Get("/api/user");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        if (HttpContext.User.Identity is { IsAuthenticated: false })
        {
            await Send.UnauthorizedAsync(ct);
            return;
        }

        var user = Database.Users
            .FirstOrDefault(u => HttpContext.User.Identity != null && u.UserPrincipalName == HttpContext.User.Identity.Name);
        if (user == null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        await Send.OkAsync(
            new GetUserResponse
            {
                UserId = user.Id,
                UserName = user.UserPrincipalName!,
                Roles = user.Roles.Select(r => new GetUserRolesListResponse.Role { Name = r.Name, RoleId = r.Id }).ToList(),
                Permissions = user.Roles.SelectMany(r => r.Permissions.Select(p => new GetUserRolesListResponse.Permission { Name = p.Name, PermissionId = p.Id })).Distinct().ToList(),
            },
            ct);
    }
}