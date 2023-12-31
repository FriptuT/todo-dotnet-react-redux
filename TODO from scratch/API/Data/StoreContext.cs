using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext: DbContext
    {
        public StoreContext(DbContextOptions options): base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}