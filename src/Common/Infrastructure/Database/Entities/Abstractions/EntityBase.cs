namespace Common.Infrastructure.Database.Entities.Abstractions;

public class EntityBase : IEntityBase
{
    public int Id { get; set; }

    public DateTimeOffset Created { get; set; }

    public string CreatedBy { get; set; } = "Unknown";

    public DateTimeOffset Modified { get; set; }

    public string ModifiedBy { get; set; } = "Unknown";
}