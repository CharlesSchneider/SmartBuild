using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartBuild.Entities;

namespace SmartBuild.Data.EntityTypeConfigurations
{
    public class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.ToTable("Addresses");
            builder.HasKey(x => x.AddressId);
            builder.Property(x => x.AddressId).UseIdentityColumn();
            builder.Property(x => x.Street).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Number).HasMaxLength(10);
            builder.Property(x => x.Neighborhood).HasMaxLength(100);
            builder.Property(x => x.City).HasMaxLength(100);
            builder.Property(x => x.State).HasMaxLength(2);
            builder.Property(x => x.ZipCode).HasMaxLength(8);
            builder.Property(x => x.Reference).HasMaxLength(200);
        }
    }
}
