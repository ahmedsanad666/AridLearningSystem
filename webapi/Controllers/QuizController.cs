using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("Arid/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public QuizController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/Courses
        [HttpGet]
        public async Task<ActionResult<object>> GetQuizis()
        {
            var Quizis = _context.Quizzes.ToList();
            var multiQuesitn = _context.MultipleQuizs.ToList();

            var data = new
            {
                Quizis,
                multiQuesitn
            };

            return data;
        }


        [HttpPost]
        [Route("AddMultipleQuestion")]
        public async Task<ActionResult<MultipleQuiz>> AddQuiz ([FromBody] MultipleQuiz Question)
        {
            try
            {
                _context.MultipleQuizs.Add(Question);
                await _context.SaveChangesAsync();
                return Ok(Question);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500,ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Quiz>> AddQuiz(Quiz quiz)
        {
            try
            {
                _context.Quizzes.Add(quiz);
                await _context.SaveChangesAsync();
                return Ok(quiz);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, ex.Message);
            }
        }



    }
}
