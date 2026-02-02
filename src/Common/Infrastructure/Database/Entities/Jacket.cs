using Common.Infrastructure.Database.Entities.Abstractions;

namespace Common.Infrastructure.Database.Entities;

public class Jacket : EntityBase
{
    public DateTimeOffset JacketDate { get; set; }

    public required string WorkOrderNumber { get; set; }

    public string? SalesOrderNumber { get; set; }

    public string? CustomerPurchaseOrderNumber { get; set; }
}