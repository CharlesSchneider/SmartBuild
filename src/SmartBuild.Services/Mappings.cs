using AutoMapper;
using SmartBuild.Entities.Customers;
using SmartBuild.Services.Customers.DTOs;

namespace SmartBuild.Services
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<Customer, CustomerView>();
            CreateMap<CustomerSave, Customer>();
        }
    }
}
