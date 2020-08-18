using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.DynamicLinq;
using Microsoft.Extensions.Logging;
using SmartBuild.Data;
using SmartBuild.Entities.Customers;
using SmartBuild.Services.Customers.ExtensionMethods;
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

        public async Task<PagedResponse<List<CustomerModel>>> GetPagedCustomersAsync(
            string searchTerm = null,
            int? start = null,
            int? length = null,
            string order = null,
            string orderDir = "asc")
        {
            try
            {
                var customersQuery = _context.Customers.Include(x => x.Address)
                                             .Where(c => string.IsNullOrWhiteSpace(searchTerm) ||
                                                        (!string.IsNullOrWhiteSpace(searchTerm) &&
                                                            (EF.Functions.Like(c.Name, $"%{searchTerm}%")
                                                            || EF.Functions.Like(c.Email, $"%{searchTerm}%")
                                                            || EF.Functions.Like(c.CPF, $"%{searchTerm}%")
                                                            || EF.Functions.Like(c.RG, $"%{searchTerm}%")
                                                            || EF.Functions.Like(c.Address.Street, $"%{searchTerm}%"))
                                                        ))
                                             .AsNoTracking();

                if (!string.IsNullOrWhiteSpace(order))
                {
                    customersQuery = customersQuery.OrderBy($"{order} {orderDir}");
                }

                if (start.HasValue && length.HasValue)
                {
                    customersQuery = customersQuery.Skip(start.Value).Take(length.Value).AsNoTracking();
                }

                var customers = await _mapper.ProjectTo<CustomerModel>(customersQuery).ToListAsync();

                return new PagedResponse<List<CustomerModel>>(
                    customers.Count,
                    _context.Customers.Count(),
                    customers);
            }
            catch (Exception ex)
            {
                var method = MethodBase.GetCurrentMethod();
                _logger.LogError(ex, $"[{method.Module.Name}] - {method.Name}");
                throw;
            }
        }

        public async IAsyncEnumerable<CustomerModel> GetCustomersAsync()
        {
            var customers = default(Task<List<CustomerModel>>);

            try
            {
                customers = _mapper.ProjectTo<CustomerModel>(_context.Customers.Include(x => x.Address).AsNoTracking())
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

        public async Task<CustomerModel> GetCustomerByIdAsync(int customerId)
        {
            var customer = default(CustomerModel);

            try
            {
                var customerQuery = _context.Customers
                                            .Where(c => c.CustomerId == customerId)
                                            .Include(x => x.Address)
                                            .AsNoTracking();
                customer = await _mapper.ProjectTo<CustomerModel>(customerQuery)
                                        .FirstOrDefaultAsync();
                return customer;
            }
            catch (Exception ex)
            {
                var method = MethodBase.GetCurrentMethod();
                _logger.LogError(ex, $"[{method.Module.Name}] - {method.Name}");
                throw;
            }
        }

        public async Task<CustomerModel> AddAsync(CustomerSave customer)
        {
            try
            {
                EvaluateAddress(customer);
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
                var existingCustomer = await _context.Customers.GetyByIdAsync(customerId);

                if (existingCustomer == null) return null;

                EvaluateAddress(customer);

                existingCustomer = _mapper.Map(customer, existingCustomer);

                _context.Update(existingCustomer);
                await _context.SaveChangesAsync();
                return _mapper.Map<CustomerModel>(existingCustomer);
            }
            catch (Exception ex)
            {
                var method = MethodBase.GetCurrentMethod();
                _logger.LogError(ex, $"{method.Module.Name}.{method.Name}");
                throw;
            }
        }

        private void EvaluateAddress(CustomerSave customer)
        {
            if (customer.Address?.AddressId == default(int) &&
                customer.Address?.City == default &&
                customer.Address?.Neighborhood == default &&
                customer.Address?.Number == default &&
                customer.Address?.Reference == default &&
                customer.Address?.State == default &&
                customer.Address?.Street == default &&
                customer.Address?.ZipCode == default)
            {
                customer.Address = null;
            }
            else
            {
                if (customer.Address?.AddressId == default(int))
                {
                    var newAddress = new AddressSave()
                    {
                        City = customer.Address?.City,
                        Neighborhood = customer.Address?.Neighborhood,
                        Number = customer.Address?.Number,
                        Reference = customer.Address?.Reference,
                        State = customer.Address?.State,
                        Street = customer.Address?.Street,
                        ZipCode = customer.Address?.ZipCode
                    };

                    customer.Address = newAddress;
                }
            }
        }

        public async Task DeleteAsync(int customerId)
        {
            try
            {
                var existingCustomer = await _context.Customers.GetyByIdAsync(customerId);

                if (existingCustomer != null)
                {
                    _context.Customers.Remove(existingCustomer);
                    await _context.SaveChangesAsync();
                }
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
