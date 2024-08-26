using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

public class HouseRepository : IHouseRepository
{
    private readonly HouseDbContext context;

    public HouseRepository(HouseDbContext context)
    {
        this.context = context;
    }

    public async Task<List<HouseDto>> GetAllAsync()
    {
        return await this.context.Houses.Select(house => new HouseDto(
            house.Id,
            house.Address,
            house.Country,
            house.Description,
            house.Price,
            house.Photo
        )).ToListAsync(); // Will automatically be converted to JSON.
    }
}