using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;
using FootballProject.Models;
using FootballProject.Models.Responses;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface IFootballerRepository<in TKey> where TKey: struct
    {
        Task<IEnumerable<Footballer>> GetFootballers();
        Task<IEnumerable<Footballer>> GetFootballersWithRoles();
        Task<IEnumerable<Footballer>> GetFootballersByRoleName(string role);
        Task<IEnumerable<Footballer>> GetFootballersByNameSurnameNationality(string name = "", string surname = "", string nationality = "");
        Task<Footballer> GetFootballerById(TKey footballerId);
        Task<IEnumerable<Footballer>> GetFootballersOrdered(string search, bool @ascending = true);
        Task<int> AddFootballer(FootballerDto footballerToAdd);
        Task<int> UpdateFootballer(int playerId, FootballerDto footballerDto);
        Task<int> DeleteFootballer(TKey footballerId);


    }
}