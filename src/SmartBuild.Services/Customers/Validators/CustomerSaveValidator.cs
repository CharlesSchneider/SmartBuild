using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.Extensions.Localization;
using SmartBuild.Data;
using SmartBuild.Services.Customers.ExtensionMethods;
using SmartBuild.Services.Customers.Models;

namespace SmartBuild.Services.Customers.Validators
{
    public class CustomerSaveValidator : AbstractValidator<CustomerSave>
    {
        private readonly SmartBuildDbContext _context;

        public CustomerSaveValidator(IStringLocalizer<CustomerSaveValidator> localizer, SmartBuildDbContext context)
        {
            _context = context;

            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage(localizer["Informe o nome."])
                .MinimumLength(3)
                .WithMessage(localizer["O nome deve ter pelo menos 3 letras."])
                .MustAsync(NameDoesntExist)
                .WithMessage(localizer["Nome já cadastrado."]);
        }

        private async Task<bool> NameDoesntExist(string name, CancellationToken cancellationToken)
        {
            return !await _context.Customers.NameExists(name);
        }
    }
}
