using Api.Features.Jackets.DataTransfer;
using Common.Infrastructure.Database.Entities;

namespace Api.Features.Jackets.Extensions;

public static class JacketExtensions
{
    public static JacketDto ToDto(this Jacket jacket)
    {
        return new JacketDto(
            jacket.Id,
            jacket.WorkOrderNumber,
            jacket.SalesOrderNumber,
            jacket.CustomerPurchaseOrderNumber,
            jacket.JacketDate);
    }
}