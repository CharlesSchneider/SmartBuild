using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SmartBuild.Data;
using SmartBuild.Entities.Customers;
using SmartBuild.Services.Customers.Models;

namespace SmartBuild.Services.Customers
{
    public class CustomersService : ICustomersService
    {
        protected readonly SmartBuildDbContext _context;
        protected readonly ILogger<CustomersService> _logger;
        private readonly IMapper _mapper;

        public CustomersService(SmartBuildDbContext context, ILogger<CustomersService> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        public async IAsyncEnumerable<CustomerModel> GetCustomersAsync()
        {
            var customers = default(Task<List<CustomerModel>>);

            try
            {
                customers = _mapper.ProjectTo<CustomerModel>(_context.Customers.AsNoTracking())
                                   .AsNoTracking()
                                   .ToListAsync();
            }
            catch (Exception ex)
            {
                var method = MethodBase.GetCurrentMethod();
                _logger.LogError(ex, $"[{method.Module.Name}] - {method.Name}");
                throw;
            }

            foreach (var customer in await customers)
            {
                yield return customer;
            }
        }

        public async Task<CustomerModel> AddAsync(CustomerSave customer)
        {
            try
            {
                var newCustomer = _mapper.Map<Customer>(customer);
                await _context.AddAsync(newCustomer);
                await _context.SaveChangesAsync();
                return _mapper.Map<CustomerModel>(newCustomer);
            }
            catch (Exception ex)
            {
                var method = MethodBase.GetCurrentMethod();
                _logger.LogError(ex, $"{method.Module.Name}.{method.Name}");
                throw;
            }
        }

        public async Task<CustomerModel> UpdateAsync(int customerId, CustomerSave customer)
        {
            try
            {
                var existingCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == customerId);

                if (existingCustomer != null)
                {
                    existingCustomer.Name = customer.Name;

                    _context.Update(existingCustomer);
                    await _context.SaveChangesAsync();
                    return _mapper.Map<CustomerModel>(existingCustomer);
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
