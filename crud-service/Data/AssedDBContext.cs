using Assed.Models;
using Microsoft.EntityFrameworkCore;

namespace Assed.Data
{

    public class AssedDBContext : DbContext
    {
        public AssedDBContext(DbContextOptions<AssedDBContext> opt) : base(opt)
        {

        }

        public DbSet<Teachers> Teachers { get; set; }

        public DbSet<QuestionSets> QuestionSets { get; set; }

        public DbSet<Questions> Questions { get; set; }

        public DbSet<StudentResults> StudentResults { get; set; }

    }
}