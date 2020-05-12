using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SmartBuild.Data;
using SmartBuild.Entities.Customers;

namespace SmartBuild.Services.Customers
{
    public class CustomersService : ICustomersService
    {
        protected readonly SmartBuildDbContext _context;
        protected readonly ILogger<CustomersService> _logger;

        public CustomersService(SmartBuildDbContext context, ILogger<CustomersService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<Customer>> GetCustomers()
        {
            try
            {
                var result = await _context.Set<Customer>().ToListAsync();

                if (result != null)
                {
                    throw new Exception("Teste!");
                }

                return result;
            }
            catch (Exception ex)
            {
                var method = MethodBase.GetCurrentMethod();
                _logger.LogError(ex, $"[{method.Module.Name}] - {method.Name}");
                throw;
            }
        }

        public async Task<int?> Add(Customer customer)
        {
            try
            {
                await _context.AddAsync(customer);
                var result = await _context.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                var method = MethodBase.GetCurrentMethod();
                _logger.LogError(ex, $"{method.Module.Name}.{method.Name}");
                throw;
            }
        }

        public async Task<int?> Update(int customerId, Customer customer)
        {
            try
            {
                var existingCustomer = await _context.Set<Customer>().FirstOrDefaultAsync(c => c.CustomerId == customerId);

                if (existingCustomer != null)
                {
                    existingCustomer.Name = customer.Name;

                    _context.Update(existingCustomer);
                    var result = await _context.SaveChangesAsync();
                    return result;
                }

                return null;
            }
            catch (Exception ex)
            {
                var method = MethodBase.GetCurrentMethod();
                _logger.LogError(ex, $"{method.Module.Name}.{method.Name}");
                throw;
            }
        }
    }
}
