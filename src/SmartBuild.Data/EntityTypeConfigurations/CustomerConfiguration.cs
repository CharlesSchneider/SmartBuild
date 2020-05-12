using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartBuild.Entities.Customers;

namespace SmartBuild.Data.EntityTypeConfigurations
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasKey(x => x.CustomerId);
            builder.Property(x => x.CustomerId).UseIdentityColumn();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
            builder.Property(x => x.BirthDate).HasColumnType("SMALLDATETIME");
            builder.Property(x => x.CellPhone).HasMaxLength(12);
            builder.Property(x => x.CPF).HasMaxLength(12);
            builder.Property(x => x.Email).HasMaxLength(200);
            builder.Property(x => x.HomePhone).HasMaxLength(12);
            builder.Property(x => x.WorkPhone).HasMaxLength(12);
            builder.Property(x => x.ReferencePhone).HasMaxLength(12);
            builder.Property(x => x.CellPhone).HasMaxLength(12);
            builder.HasQueryFilter(x => !x.IsDeleted); // IgnoreQueryFilters() on linq queris ignores Query Filters when performing linq queries
        }
    }
}
