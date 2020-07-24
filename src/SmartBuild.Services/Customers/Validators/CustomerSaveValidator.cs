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
                .WithMessage(localizer["Informe o nome"])
                .MinimumLength(3)
                .WithMessage(localizer["O nome deve ter pelo menos 3 letras"])
                .MustAsync(NameDoesntExist)
                .WithMessage(localizer["Nome já cadastrado"]);

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage(localizer["Informe o e-mail"])
                .EmailAddress()
                .WithMessage(localizer["Informe um e-mail válido"])
                .MustAsync(EmailDoesntExist)
                .WithMessage(localizer["E-mail já cadastrado"]);

            RuleFor(x => x.BirthDate)
                .NotEmpty()
                .WithMessage(localizer["Informe a data de nascimento"]);

            RuleFor(x => x.CPF)
                .NotEmpty()
                .WithMessage(localizer["Informe o CPF"]);

            RuleFor(x => x.RG)
                .NotEmpty()
                .WithMessage(localizer["Informe o RG"]);

            RuleFor(x => x.CellPhone)
                .NotEmpty()
                .WithMessage(localizer["Informe o celular"]);

            RuleFor(x => x.HomePhone)
                .NotEmpty()
                .WithMessage(localizer["Informe o telefone"]);

            RuleFor(x => x.ReferencePhone)
                .NotEmpty()
                .WithMessage(localizer["Informe o telefone de referência"]);

            RuleFor(x => x.WorkPhone)
                .NotEmpty()
                .WithMessage(localizer["Informe o telefone do trabalho"]);

            RuleFor(x => x.Address.City)
                .NotEmpty()
                .WithMessage(localizer["Informe a cidade"]);

            RuleFor(x => x.Address.Street)
                .NotEmpty()
                .WithMessage(localizer["Informe o endereço"]);

            RuleFor(x => x.Address.Neighborhood)
                .NotEmpty()
                .WithMessage(localizer["Informe o bairro"]);

            RuleFor(x => x.Address.Number)
                .NotEmpty()
                .WithMessage(localizer["Informe o número"]);

            RuleFor(x => x.Address.Reference)
                .NotEmpty()
                .WithMessage(localizer["Informe a referência"]);

            RuleFor(x => x.Address.State)
                .NotEmpty()
                .WithMessage(localizer["Informe o estado"]);

            RuleFor(x => x.Address.ZipCode)
                .NotEmpty()
                .WithMessage(localizer["Informe o CEP"]);
        }

        private async Task<bool> NameDoesntExist(string name, CancellationToken cancellationToken)
        {
            return !await _context.Customers.NameExists(name);
        }

        private async Task<bool> EmailDoesntExist(string email, CancellationToken cancellationToken)
        {
            return !await _context.Customers.EmailExists(email);
        }
    }
}
