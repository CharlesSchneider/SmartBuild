using Microsoft.EntityFrameworkCore;
using SmartBuild.Data.EntityTypeConfigurations;
using SmartBuild.Entities.Customers;

namespace SmartBuild.Data
{
    public class SmartBuildDbContext : DbContext
    {
        #region Constructors

        public SmartBuildDbContext()
        {
        }

        public SmartBuildDbContext(DbContextOptions<SmartBuildDbContext> options) : base(options)
        {
        }

        #endregion

        #region DbSets

        public DbSet<Customer> Customers { get; set; }

        #endregion

        #region Methods

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AddressConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());

            base.OnModelCreating(modelBuilder);
        }

        #endregion

    }
}
