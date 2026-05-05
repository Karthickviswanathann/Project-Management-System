using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using PMS_Api.DtoModels;
using PMS_Api.Services;
using PMS_Api.Services.Implementation;
using PMS_Api.Services.Interface;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Configuration.GetConnectionString("ConnectionStrings:DefaultConnection");
builder.Services.RegisterServiceDefaultDependencies(builder.Configuration);

var app = builder.Build();



//app.Use(async (context, next) =>
//{
//    await next();

//    if (context.Response.StatusCode == (int)HttpStatusCode.Unauthorized) // 401
//    {
//        RespModel newResponsemodel = new RespModel();

//        newResponsemodel.resStatus = "401";
//        newResponsemodel.resDesc = "UnAuthorized Access Error";
//        newResponsemodel.resType = "Error";
//        newResponsemodel.Data = null;
//        string response = JsonConvert.SerializeObject(newResponsemodel).ToString();
//        context.Response.ContentType = "application/json";
//        await context.Response.WriteAsync(response);
//    }
//});


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
