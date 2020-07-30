using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;
using SmartBuild.Data;
using SmartBuild.Services.Customers.ExtensionMethods;
using SmartBuild.Services.Customers.Models;

namespace SmartBuild.Services.Customers.Validators
{
    public class CustomerSaveValidator : AbstractValidator<CustomerSave>
    {
        private readonly SmartBuildDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CustomerSaveValidator(
            IStringLocalizer<CustomerSaveValidator> localizer,
            SmartBuildDbContext context,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;

            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage(localizer["Informe o nome"])
                .MinimumLength(3)
                .WithMessage(localizer["O nome deve ter pelo menos 3 letras"]);
            //.MustAsync(NameDoesntExist)
            //.WithMessage(localizer["Nome já cadastrado"]);

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage(localizer["Informe o e-mail"])
                .EmailAddress()
                .WithMessage(localizer["Informe um e-mail válido"])
                .MustAsync(EmailDoesntExist)
                .WithMessage(localizer["E-mail já cadastrado"]);
        }

        private async Task<bool> NameDoesntExist(string name, CancellationToken cancellationToken)
        {
            return !await _context.Customers.NameExists(name);
        }

        private async Task<bool> EmailDoesntExist(CustomerSave customer, string email, CancellationToken cancellationToken)
        {
            return !await _context.Customers.EmailExists(customer.CustomerId, email);
        }
    }
}
