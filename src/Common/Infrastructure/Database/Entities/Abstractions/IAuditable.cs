namespace Common.Infrastructure.Database.Entities.Abstractions;

public interface IAuditable
{
    DateTimeOffset Created { get; set; }

    string CreatedBy { get; set; }

    DateTimeOffset Modified { get; set; }

    string ModifiedBy { get; set; }
}