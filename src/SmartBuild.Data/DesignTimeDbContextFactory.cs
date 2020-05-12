using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace SmartBuild.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<SmartBuildDbContext>
    {
        public SmartBuildDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<SmartBuildDbContext>();
            builder.UseSqlServer(ConnectionStringHelper.GetConnectionString());
            return new SmartBuildDbContext(builder.Options);
        }
    }
}
