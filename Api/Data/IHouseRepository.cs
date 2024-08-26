public interface IHouseRepository
{
    Task<List<HouseDto>> GetAllAsync();
}