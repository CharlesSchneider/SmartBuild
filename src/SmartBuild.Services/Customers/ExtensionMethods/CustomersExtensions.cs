using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartBuild.Entities.Customers;

namespace SmartBuild.Services.Customers.ExtensionMethods
{
    public static class CustomersExtensions
    {
        public static async Task<Customer> GetyByNameAsync(this DbSet<Customer> customers, string name)
        {
            return await customers.FirstOrDefaultAsync(c => c.Name.ToLower() == name.ToLower());
        }

        public static async Task<bool> NameExists(this DbSet<Customer> customers, string name)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                return await customers.AsNoTracking().AnyAsync(c => c.Name.ToLower() == name.ToLower());
            }

            return false;
        }
    }
}
