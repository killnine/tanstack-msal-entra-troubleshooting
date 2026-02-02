using Common.Infrastructure.Database.Entities.Abstractions;

namespace Common.Infrastructure.Database.Entities.Permissions;

public class Permission : EntityBase
{
    public string Name { get; set; } = null!;
}