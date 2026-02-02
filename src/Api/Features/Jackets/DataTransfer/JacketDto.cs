using Common.DataTransfer;
using Common.Extensions;

namespace Api.Features.Jackets.DataTransfer;

public record JacketDto : DtoBase
{
    public JacketDto(
        int id,
        string workOrderNumber,
        string? salesOrderNumber,
        string? customerPurchaseOrderNumber,
        DateTimeOffset jacketDate)
        : base(id)
    {
        WorkOrderNumber = workOrderNumber;
        SalesOrderNumber = salesOrderNumber;
        CustomerPurchaseOrderNumber = customerPurchaseOrderNumber;
        JacketDate = jacketDate.ToApiSafeString();
    }

    public object JacketDate { get; set; }

    public string? CustomerPurchaseOrderNumber { get; set; }

    public string? SalesOrderNumber { get; set; }

    public string WorkOrderNumber { get; set; }
}