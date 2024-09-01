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
            house.Price
        )).ToListAsync(); // Will automatically be converted to JSON.
    }

    public async Task<HouseDetailDto?> GetByIdAsync(int id)
    {
        var entity = await this.context.Houses.SingleOrDefaultAsync(house => house.Id == id);
        if (entity == null)
        {
            return null;
        }
        return new HouseDetailDto(
            entity.Id,
            entity.Address,
            entity.Country,
            entity.Price,
            entity.Description,
            entity.Photo
        );
    }
}