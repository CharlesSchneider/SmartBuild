using AutoMapper;
using SmartBuild.Entities;
using SmartBuild.Entities.Customers;
using SmartBuild.Services.Customers.Models;

namespace SmartBuild.Services
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<Customer, CustomerModel>()
                .ForMember(dest => dest.BirthDate, opt => opt.MapFrom(orig => orig.BirthDate.HasValue ? orig.BirthDate.Value.ToString("dd/MM/yyyy") : ""));
            CreateMap<Address, AddressModel>();
            CreateMap<CustomerSave, Customer>()
                .ForMember(dest => dest.CustomerId, opt => opt.UseDestinationValue());
            CreateMap<AddressSave, Address>()
                .ForMember(dest => dest.AddressId, opt => opt.UseDestinationValue());
        }
    }
}
