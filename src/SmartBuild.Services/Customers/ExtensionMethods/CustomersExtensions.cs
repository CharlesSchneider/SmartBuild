using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartBuild.Entities.Customers;

namespace SmartBuild.Services.Customers.ExtensionMethods
{
    public static class CustomersExtensions
    {
        public static async Task<Customer> GetyByIdAsync(this DbSet<Customer> customers, int customerId)
        {
            return await customers
                        .Include(x => x.Address)
                        .FirstOrDefaultAsync(c => c.CustomerId == customerId);
        }

        public static async Task<Customer> GetByNameAsync(this DbSet<Customer> customers, string name)
        {
            return await customers
                         .Include(x => x.Address)
                         .FirstOrDefaultAsync(c => c.Name.ToLower() == name.ToLower());
        }

        public static async Task<bool> NameExists(this DbSet<Customer> customers, string name)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                return await customers.AsNoTracking().AnyAsync(c => c.Name.ToLower() == name.ToLower());
            }

            return false;
        }

        public static async Task<bool> EmailExists(this DbSet<Customer> customers, int customerId, string email)
        {
            if (!string.IsNullOrWhiteSpace(email))
            {
                return await customers
                            .AsNoTracking()
                            .AnyAsync(c => c.CustomerId != customerId && c.Email.ToLower() == email.ToLower());
            }

            return false;
        }
    }
}
