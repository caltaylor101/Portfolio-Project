using Domain;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            var users = new List<AppUser>();
            if (!userManager.Users.Any())
            {
                users = new List<AppUser>
                {
                    new AppUser{
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                        },
                        new AppUser{
                        DisplayName = "Jackson",
                        UserName = "JackOLantern",
                        Email = "jack@test.com"
                        },
                        new AppUser{
                        DisplayName = "Emily",
                        UserName = "EmiWoo",
                        Email = "emily@test.com"
                        }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Password1-1");
                }
            }


            if (!context.Blogs.Any())
            {

                var blogs = new List<Blog>
                {

                    new Blog
                    {
                        Title = "Past Blog 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Blog 2 months ago",
                        Category = "drinks",
                        Body = "Body of 1",
                        UrlSuffix = "Test",
                        AppUser = users[0]
                    },
                    new Blog
                    {
                        Title = "Past Blog 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Blog 1 month ago",
                        Category = "culture",
                        Body = "Another body of the 2nd",
                        UrlSuffix = "Test",
                        AppUser = users[0]
                    },
                    new Blog
                    {
                        Title = "Future Blog 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Blog 1 month in future",
                        Category = "music",
                        Body = "Some complicated stuff.",
                        UrlSuffix = "Test",
                        AppUser = users[0]

                    },
                    new Blog
                    {
                        Title = "Future Blog 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Blog 2 months in future",
                        Category = "food",
                        Body = "woop woop",
                        UrlSuffix = "Test",
                        AppUser = users[1]


                    },
                    new Blog
                    {
                        Title = "Future Blog 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Blog 3 months in future",
                        Category = "drinks",
                        Body = "woop woop",
                        UrlSuffix = "Test",
                        AppUser = users[0]


                    },
                    new Blog
                    {
                        Title = "Future Blog 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Blog 4 months in future",
                        Category = "culture",
                        Body = "woop woop",
                        UrlSuffix = "Test",
                        AppUser = users[1]


                    },
                    new Blog
                    {
                        Title = "Future Blog 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Blog 5 months in future",
                        Category = "drinks",
                        Body = "woop woop",
                        UrlSuffix = "Test",
                        AppUser = users[2]


                    },
                    new Blog
                    {
                        Title = "Future Blog 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Blog 6 months in future",
                        Category = "music",
                        Body = "woop woop",
                        UrlSuffix = "Test",
                        AppUser = users[0]


                    },
                    new Blog
                    {
                        Title = "Future Blog 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Blog 7 months in future",
                        Category = "travel",
                        Body = "woop woop",
                        UrlSuffix = "Test",
                        AppUser = users[2]


                    },
                    new Blog
                    {
                        Title = "Future Blog 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Blog 8 months in future",
                        Category = "drinks",
                        Body = "woop woop",
                        UrlSuffix = "Test",
                        AppUser = users[2]


                    }
                };

                await context.Blogs.AddRangeAsync(blogs);
                await context.SaveChangesAsync();
            }
        }
    }
}
