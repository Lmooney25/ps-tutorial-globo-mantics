public interface IHouseRepository
{
    Task<List<HouseDto>> GetAllAsync();

    Task<HouseDetailDto?> GetByIdAsync(int id);
}