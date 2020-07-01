using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using SmartBuild.Entities;
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

        public override EntityEntry<TEntity> Remove<TEntity>(TEntity entity)
        {
            if (entity is IDeletable deletableEntity)
            {
                deletableEntity.IsDeleted = true;
                return base.Update(entity);
            }

            return base.Remove(entity);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        #endregion

    }
}
