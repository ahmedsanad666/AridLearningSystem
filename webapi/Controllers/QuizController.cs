using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Text.RegularExpressions;
using webapi.Data;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("Arid/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public static IWebHostEnvironment _webHostEnvironment;
        public QuizController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _context = context;
        }


        // GET: api/Courses
        [HttpGet]
        public async Task<ActionResult<object>> GetQuizis()
        {
            var Quizis = _context.Quizzes.ToList();
            foreach (var quiz in Quizis)
            {
                string fileName = "quiz" + quiz.Id + ".png";
                var path = Path.Combine(_webHostEnvironment.WebRootPath, "imgs", fileName);

                quiz.ImgByte = System.IO.File.ReadAllBytes(path);
            }
            var multiQuesitn = _context.MultipleQuizs.ToList();
            var fillBlankQuestions = _context.fillTheBlankQuizzes.ToList();
            var dragDropQ = _context.DragDropQuizzes.ToList();
            var match = _context.MatchQuizes.ToList();
            var imagsBox = _context.imageChoices.ToList();



            var combinedData = match.Select(m => new
            {
                customId = m.CustomId,
                choices = m.Choices,
                Pics = imagsBox
        .Where(i => i.QuestionId == m.CustomId + "1"  || i.QuestionId == m.CustomId + "2" || i.QuestionId == m.CustomId + "3"  || i.QuestionId == m.CustomId + "4")
        .ToList(),
                point = m.Point,
                time = m.Time
            })
.ToList();

            foreach(var el in combinedData) {
                var id = el.customId;
            foreach (var u in el.Pics)
                {
                    

                    string fileName = "match" + id + u.AnswerIndex + ".png";
                    var path = Path.Combine(_webHostEnvironment.WebRootPath, "imgs", fileName);
                    var test = u.AnswerIndex;
                    u.ImgByte = System.IO.File.ReadAllBytes(path);

                }
            }



            var data = new
            {
                Quizis,
                multiQuesitn,
                fillBlankQuestions,
                dragDropQ,
                combinedData

            };

            return data;
        }
        [HttpGet]
        [Route("MultipleQuiz")]
        public async Task<ActionResult<object>> GetMultiPleQuizis()
        {
            var Quizis = _context.Quizzes.Where(u => u.Type == "multipleChoices").ToList();
            foreach (var quiz in Quizis)
            {
                string fileName = "quiz" + quiz.Id + ".png";
                var path = Path.Combine(_webHostEnvironment.WebRootPath, "imgs", fileName);

                quiz.ImgByte = System.IO.File.ReadAllBytes(path);
            }
            var multiQuesitn = _context.MultipleQuizs.ToList();

            var data = new
            {
                Quizis,
                multiQuesitn
            };

            return data;
        }

        [HttpGet]
        [Route("fillTheBlank")]
        public async Task<ActionResult<object>> GetfillBlank()
        {
            var Quizis = _context.Quizzes.Where(u => u.Type == "fillTheBlank").ToList();
            foreach (var quiz in Quizis)
            {
                string fileName = "quiz" + quiz.Id + ".png";
                var path = Path.Combine(_webHostEnvironment.WebRootPath, "imgs", fileName);

                quiz.ImgByte = System.IO.File.ReadAllBytes(path);
            }
            var multiQuesitn = _context.fillTheBlankQuizzes.ToList();

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
        [Route("AddFillBlank")]
        public async Task<ActionResult<MultipleQuiz>> AddFillBlank([FromBody] FillTheBlankQuiz Question)
        {
            try
            {
                _context.fillTheBlankQuizzes.Add(Question);
                await _context.SaveChangesAsync();
                return Ok(Question);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("addDragDrop")]
        public async Task<ActionResult<MultipleQuiz>> AddDragDropQuiz([FromBody] DragDropQuiz Question)
        {
            try
            {
                _context.DragDropQuizzes.Add(Question);
                await _context.SaveChangesAsync();
                return Ok(Question);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet]
        [Route("DragDrop")]
        public async Task<ActionResult<object>> GeDragDropQuestions()
        {
            var Quizis = _context.Quizzes.Where(u => u.Type == "DragDrop").ToList();
            foreach (var quiz in Quizis)
            {
                string fileName = "quiz" + quiz.Id + ".png";
                var path = Path.Combine(_webHostEnvironment.WebRootPath, "imgs", fileName);

                quiz.ImgByte = System.IO.File.ReadAllBytes(path);
            }
            var multiQuesitn = _context.DragDropQuizzes.ToList();

            var data = new
            {
                Quizis,
                multiQuesitn
            };

            return data;
        }
        [HttpPost]
        public async Task<ActionResult<Quiz>> AddQuiz([FromForm] Quiz quiz)
        {
            try
            {

                string message = "";
                var files = quiz.Files;
                quiz.Files = null;

                _context.Quizzes.Add(quiz);
                await _context.SaveChangesAsync();

                if(quiz.Id > 0 && files != null && files.Length > 0)
                {
                    string path = _webHostEnvironment.WebRootPath + "\\imgs\\";
                    if(!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    string FileName = "quiz" + quiz.Id + ".png";
                    if(System.IO.File.Exists(path + FileName))
                    {
                        System.IO.File.Delete(path + FileName);
                    }

                    using( FileStream fileStream = System.IO.File.Create(path + FileName))
                    {
                        files.CopyTo(fileStream);
                        fileStream.Flush();
                        message = "success";
                    }

                }else if(quiz.Id == 0)
                {
                    message = "failed";
                }
                else
                {
                    message  = "success";
                }

                if (message == "success")
                {

                    return Ok(quiz);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, message);
                }
                 
                
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode((int)HttpStatusCode.InternalServerError,ex.Message);
            }
        }

        [HttpPost]
        [Route("match")]
        public async Task<IActionResult> AddMatchQuiz([FromBody] MatchQuiz matchQuiz)
        {
            try
            {
                _context.MatchQuizes.Add(matchQuiz);
                await _context.SaveChangesAsync();
                return Ok(matchQuiz);
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost]
        [Route("addPic")]
        public async Task<ActionResult<Quiz>> AddPic([FromForm] ImageChoice image)
        {
            try
            {

                string message = "";
                var files = image.Files;
                image.Files = null;

                _context.imageChoices.Add(image);
                await _context.SaveChangesAsync();

                if (image.Id > 0 && files != null && files.Length > 0)
                {
                    string path = _webHostEnvironment.WebRootPath + "\\imgs\\";
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    string FileName = "match" + image.QuestionId + ".png";
                    //if (System.IO.File.Exists(path + FileName))
                    //{
                    //    System.IO.File.Delete(path + FileName);
                    //}

                    using (FileStream fileStream = System.IO.File.Create(path + FileName))
                    {
                        files.CopyTo(fileStream);
                        fileStream.Flush();
                        message = "success";
                    }

                }
                else if (image.Id == 0)
                {
                    message = "failed";
                }
                else
                {
                    message = "success";
                }

                if (message == "success")
                {

                    return Ok(image);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.InternalServerError, message);
                }


            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
   
}
