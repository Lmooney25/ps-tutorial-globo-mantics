using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<HouseDbContext>(
    o => o.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
);
builder.Services.AddScoped<IHouseRepository, HouseRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());

app.UseHttpsRedirection();

app.MapGet("/houses", async (IHouseRepository houseRepository) =>
    await houseRepository.GetAllAsync()
).Produces<List<HouseDto>>(StatusCodes.Status200OK);

app.MapGet("/houses/{id:int}", async (int id, IHouseRepository houseRepository) =>
{
    HouseDetailDto? house = await houseRepository.GetByIdAsync(id);
    if (house == null)
    {
        return Results.Problem($"House with id {id} not found.", statusCode: 404);
    }
    return Results.Ok(house);
}).ProducesProblem(statusCode: 404).Produces<HouseDetailDto>(StatusCodes.Status200OK);

app.Run();

