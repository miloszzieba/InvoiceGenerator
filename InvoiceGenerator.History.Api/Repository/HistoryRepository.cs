using InvoiceGenerator.Core.Repository;
using InvoiceGenerator.History.Api.Context;
using InvoiceGenerator.History.Api.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.History.Api.Repository
{
    public class HistoryRepository : IAsyncRepository<InvoiceHistory>
    {
        public readonly InvoiceHistoryContext invoiceHistoryContext;

        public HistoryRepository(InvoiceHistoryContext invoiceHistoryContext)
        {
            this.invoiceHistoryContext = invoiceHistoryContext;
        }

        ////public async Task Add<T>(T entity) where T : Entity
        ////{
        ////    await this.invoiceHistoryContext.AddAsync(entity);
        ////}

        ////public async Task Update<T>(T entity) where T : Entity
        ////{
        ////    var item = await this.invoiceHistoryContext.InvoiceHistories.Include(d => d.InvoiceData).FirstOrDefaultAsync(t=>t.InvoiceNumber == entity.InvoiceNumber);

        ////    if (item == null)
        ////        return;

        ////    this.invoiceHistoryContext.Update(item);
        ////}

        ////public async Task Delete(int Id)
        ////{
        ////    var removeEntity = await this.invoiceHistoryContext.InvoiceHistories.FirstAsync(h => h.Id == Id);
        ////    this.invoiceHistoryContext.Remove(removeEntity);
        ////}

        ////public async Task<IEnumerable<InvoiceHistory>> GetAllInvoiceHistories()
        ////{
        ////    IEnumerable<InvoiceHistory> histories =  this.invoiceHistoryContext.InvoiceHistories;

        ////    return histories;
        ////}

        ////public async Task<InvoiceHistory> GetInvoiceHistoryWithDataById(int id)
        ////{
        ////    var histories = await this.invoiceHistoryContext.InvoiceHistories.Include(d=>d.InvoiceData).FirstOrDefaultAsync(h => h.Id == id);

        ////    return histories;
        ////}

        public async Task<bool> SaveChangesAsync()
        {
            return (await this.invoiceHistoryContext.SaveChangesAsync()) > 0;
        }

        public async Task AddAsync(InvoiceHistory entity)
        {
            await this.invoiceHistoryContext.AddAsync(entity);
        }

        public async Task UpdateAsync(InvoiceHistory entity)
        {
            var item = await this.invoiceHistoryContext.InvoiceHistories.Include(d => d.InvoiceData).FirstAsync(t => t.InvoiceNumber == entity.InvoiceNumber);

            item.InvoiceData = entity.InvoiceData;
        }

        public async Task DeleteAsync(int id)
        {
            var removeEntity = await this.invoiceHistoryContext.InvoiceHistories.FirstAsync(h => h.Id == id);
            this.invoiceHistoryContext.Remove(removeEntity);
        }

        public async Task<IEnumerable<InvoiceHistory>> GetAllAsync()
        {
            IEnumerable<InvoiceHistory> histories = this.invoiceHistoryContext.InvoiceHistories;

            return histories;
        }

        public async Task<InvoiceHistory> GetyByIdAsync(int id)
        {
            var histories = await this.invoiceHistoryContext.InvoiceHistories.Include(d => d.InvoiceData).FirstOrDefaultAsync(h => h.Id == id);

            return histories;
        }
    }
}
