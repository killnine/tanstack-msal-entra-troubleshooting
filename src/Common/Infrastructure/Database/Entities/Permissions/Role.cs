using Common.Infrastructure.Database.Entities.Abstractions;

namespace Common.Infrastructure.Database.Entities.Permissions;

public class Role : EntityBase
{
    public static Role ReadOnly => new() { Id = 1, Name = "Read-Only" };

    public static Role JacketMaintainer => new() { Id = 2, Name = "Jacket Maintainer" };

    public static Role Administrator => new() { Id = 3, Name = "Administrator" };

    public string Name { get; set; } = null!;

    public List<User> Users { get; } = new();

    public List<Permission> Permissions { get; set; } = new();
}