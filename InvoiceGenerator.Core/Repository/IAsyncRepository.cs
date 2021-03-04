using System.Collections.Generic;
using System.Threading.Tasks;

namespace InvoiceGenerator.Core.Repository
{
    public interface IAsyncRepository<T> 
    {
        Task AddAsync(T entity);

        Task UpdateAsync(T entity);

        Task DeleteAsync(int id);

        Task<bool> SaveChangesAsync();

        Task<IEnumerable<T>> GetAllAsync();

        Task<T> GetyByIdAsync(int id);
    }
}
