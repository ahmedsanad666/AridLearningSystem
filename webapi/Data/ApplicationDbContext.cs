using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using webapi.Data.Config;
using webapi.Models;

namespace webapi.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApiUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :base(options)
        {
            
        }
        public DbSet<QuizResult> QuizResults { get; set; }
        public DbSet<ImageChoice> imageChoices { get; set; }
        public DbSet<MatchQuiz> MatchQuizes { get; set; }
       public DbSet<DragDropQuiz> DragDropQuizzes { get; set; }
        public DbSet<FillTheBlankQuiz> fillTheBlankQuizzes { get; set; }
        public DbSet<MultipleQuiz> MultipleQuizs { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseChapter> CourseChapters { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Slide> Slides { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<SlideComment> slideComments { get; set; }
        public DbSet<Blog> blogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new RoleConfig());


        }

      




    }
}
