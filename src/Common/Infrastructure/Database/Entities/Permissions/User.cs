using Common.Infrastructure.Database.Entities.Abstractions;

namespace Common.Infrastructure.Database.Entities.Permissions;

public class User : EntityBase
{
    public Guid ObjectId { get; set; }

    public string? UserPrincipalName { get; set; }

    public string? DisplayName { get; set; }

    public string? Email { get; set; }

    public string? JobTitle { get; set; }

    public List<Role> Roles { get; set; } = new();
}