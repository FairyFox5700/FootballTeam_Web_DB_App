using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using DbUp;
using FootballProject.Dal.Impl;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using VMD.RESTApiResponseWrapper.Core;
using VMD.RESTApiResponseWrapper.Core.Extensions;

namespace FootballProject.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var controllersAssembly = Assembly.Load("FootballProject.Web.Controllers");
            services.AddControllers();
            var connectionString = Configuration.GetConnectionString();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });                
            });
            Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
            DalDependencyInjector.Install(services);
                //TODO add scripts to run migrations
               EnsureDatabase.For.PostgresqlDatabase(connectionString);
                var upgrader = DeployChanges.To
                    .PostgresqlDatabase(connectionString, null)
                    .WithScriptsEmbeddedInAssembly(
                        System.Reflection.Assembly.GetExecutingAssembly()
                    )
                    .WithVariablesDisabled()
                    .WithTransaction()
                    .Build();
                    
                if (upgrader.IsUpgradeRequired())
                {
                    upgrader.PerformUpgrade();
                }
                
        }

        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
      
          
            app.UseRouting();
           // app.UseApiResponseAndExceptionWrapper();
            app.UseAuthorization();            
            app.UseCors(options => 
                    options
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins(Configuration["Frontend"]));
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            
        }
    }
}