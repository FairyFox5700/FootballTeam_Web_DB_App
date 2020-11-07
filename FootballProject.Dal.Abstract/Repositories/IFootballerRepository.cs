using System.Collections.Generic;
using FootballProject.Entities;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface IFootballerRepository<in TKey> where TKey: struct
    {
        IEnumerable<Footballer> GetFootballers();
        IEnumerable<Footballer> GetFootballersBySearch(string search);
        Footballer GetFootballerById(TKey footballerId);
        bool FootballerExists(TKey footballerId);
    }
}