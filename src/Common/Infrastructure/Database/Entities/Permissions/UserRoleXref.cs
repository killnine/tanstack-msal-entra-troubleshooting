namespace Common.Infrastructure.Database.Entities.Permissions;

public class UserRoleXref
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int RoleId { get; set; }

    public DateTimeOffset Created { get; set; }
}