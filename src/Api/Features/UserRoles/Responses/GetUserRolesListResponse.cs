namespace Api.Features.UserRoles.Responses;

public record GetUserRolesListResponse
{
    public required List<UserRole> UserRoles { get; set; }

    public required List<Role> Roles { get; set; }

    public record UserRole
    {
        public required int UserId { get; set; }

        public required string UserName { get; set; }

        public required List<Role> Roles { get; set; }

        public required List<Permission> Permissions { get; set; }
    }

    public record Role
    {
        public required int RoleId { get; set; }

        public required string Name { get; set; }
    }

    public record Permission
    {
        public required int PermissionId { get; set; }

        public required string Name { get; set; }
    }
}