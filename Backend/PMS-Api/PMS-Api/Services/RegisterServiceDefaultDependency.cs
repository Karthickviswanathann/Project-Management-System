using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using PMS_Api.DtoModels;
using PMS_Api.Services.Implementation;
using PMS_Api.Services.Interface;
using System.Text;

namespace PMS_Api.Services
{
    public static class RegisterServiceDefaultDependency
    {


        public static void RegisterServiceDefaultDependencies(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddScoped<DataAccess>();
            services.AddScoped<IDataFlow, DataFlow>();



            #region JwtConfig


            var Authkey = configuration.GetRequiredSection("JWT:SecurityKey").Value;
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = false;


                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Authkey)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };

                options.Events = new JwtBearerEvents
                {
                    OnChallenge = async context =>
                    {
                        context.HandleResponse();

                        context.Response.StatusCode = 401;
                        context.Response.ContentType = "application/json";

                        var response = JsonConvert.SerializeObject(new RespModel
                        {
                            resStatus = "401",
                            resDesc = "Unauthorized Access",
                            resType = "Error",
                            Data = null
                        });

                        await context.Response.WriteAsync(response);
                    }
                };



            });
            #endregion

            #region versioning

            //services.AddApiVersioning(options =>
            //{
            //    // Specify whether to report API versions in response headers.
            //    options.ReportApiVersions = true;

            //    // Specify the default API version.
            //    options.DefaultApiVersion = new ApiVersion(1, 0);

            //    // Specify how to read API versions from HTTP headers, URL segments, or query parameters.
            //    options.ApiVersionReader = ApiVersionReader.Combine(
            //        new HeaderApiVersionReader("api-version"),
            //        new UrlSegmentApiVersionReader(),
            //        new QueryStringApiVersionReader("v"));

            //    // Specify whether to assume the default API version if not specified.
            //    options.AssumeDefaultVersionWhenUnspecified = true;
            //}).AddMvc().AddApiExplorer
            //(setup =>
            //{
            //    setup.GroupNameFormat = "'v'VVV";
            //    setup.SubstituteApiVersionInUrl = true;
            //});


            #endregion
            #region Swagger


            services.AddSwaggerGen(options =>
            {

                options.AddSecurityDefinition("Authentication", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT"
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                   {
                      new OpenApiSecurityScheme
                      {
                          Reference = new OpenApiReference
                          {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Authentication" // Reference the security definition by name
                          },
                      },
                      new string[]{}
                   }
                });

            });

            //services.ConfigureOptions<SwaggerConfigOption>();
            #endregion
        }









    }
}
