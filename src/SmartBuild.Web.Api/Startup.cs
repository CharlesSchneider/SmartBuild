using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SmartBuild.Data;
using SmartBuild.Services;
using SmartBuild.Services.Customers;
using SmartBuild.Web.Api.Controllers;

namespace SmartBuild.Web.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyHeader();
                        builder.AllowAnyOrigin();
                        builder.AllowAnyMethod();
                    });
            });

            services.AddControllers()
                .AddFluentValidation(config =>
                {
                    config.RegisterValidatorsFromAssemblyContaining<CustomersService>()
                          .RegisterValidatorsFromAssemblyContaining<CustomersController>();
                    config.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                });

            services.AddHttpContextAccessor();

            services.AddLocalization();

            services.AddDbContext<SmartBuildDbContext>(options =>
            {
                options
                    .UseSqlServer(Configuration.GetConnectionString("SmartBuildConnection"))
                    .EnableDetailedErrors();
            });

            services.AddAutoMapper(typeof(Mappings));

            services.AddTransient<ICustomersService, CustomersService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            InitializeDatabase(app);
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<SmartBuildDbContext>().Database.Migrate();
            }
        }
    }
}
