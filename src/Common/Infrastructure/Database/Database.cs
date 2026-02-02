using Common.Infrastructure.Database.Entities;
using Common.Infrastructure.Database.Entities.Permissions;

namespace Common.Infrastructure.Database;

public static class Database
{
    public static readonly string PermissionJacketRead = "Jacket_Read";

    public static IReadOnlyList<Permission> Permissions { get; } = new List<Permission>()
    {
        new() { Id = 1, Name = PermissionJacketRead },
    };

    public static IReadOnlyList<User> Users { get; } = new List<User>()
    {
        new()
        {
            ObjectId = Guid.Parse("1387957c-e786-47fb-9603-e4476fa39370"),
            UserPrincipalName = "john.doe@derekdoes.onmicrosoft.com",
            DisplayName = "John Doe",
            Email = "john.doe@derekdoes.onmicrosoft.com",
            JobTitle = "Operator",
            Roles =
            [
                new Role()
                {
                    Name = "Operator",
                    Permissions =
                    [
                        new Permission() { Id = 1, Name = PermissionJacketRead }
                    ]
                }
            ],
        }
    };

    public static IReadOnlyList<Jacket> Jackets { get; } = new List<Jacket>()
    {
        new()
        {
            Id = 1,
            JacketDate = DateTimeOffset.UtcNow,
            WorkOrderNumber = "WO12345",
            CustomerPurchaseOrderNumber = "PO121212",
            SalesOrderNumber = "123456",
            CreatedBy = "system",
            ModifiedBy = "system",
            Created = DateTime.UtcNow,
            Modified = DateTime.UtcNow,
        },
    };
}