using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<BlogAuthor> BlogAuthors { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BlogAuthor>(x => x.HasKey(aa => new {aa.AppUserId, aa.BlogId}));
            builder.Entity<BlogAuthor>().HasOne(u=>u.AppUser).WithMany(a => a.Blogs).HasForeignKey(aa => aa.AppUserId);
            builder.Entity<BlogAuthor>().HasOne(u=>u.Blog).WithMany(a => a.Authors).HasForeignKey(aa => aa.BlogId);


        }
    }
}