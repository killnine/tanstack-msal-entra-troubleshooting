using Api.Features.UserRoles.Responses;

namespace Api.Features.Users.Responses;

public record GetUserResponse
{
    public required int UserId { get; set; }

    public required string UserName { get; set; } = "Unknown";

    public List<GetUserRolesListResponse.Role> Roles { get; set; } = [];

    public List<GetUserRolesListResponse.Permission> Permissions { get; set; } = [];
}