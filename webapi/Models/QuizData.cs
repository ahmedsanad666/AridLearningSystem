using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models;

public class Quiz
    {

        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
          public string Description { get; set; }
   

    [NotMapped]
    public List<MultipleQuiz> MultipleQuizzes { get; set; }
    [NotMapped]

    public List<FillTheBlankQuiz> FillTheBlankQuizzes { get; set; }
    [NotMapped]

    public List<DragDropQuiz> DragDropQuizzes { get; set; }
    [NotMapped]

    public List<MatchQuiz> MatchQuizzes { get; set; }


}

    public class MultipleQuiz
    {
        [Key]
        public int Id { get; set; }
        public String QuestionText { get; set; }

        public int Point { get; set; }
        public int Time { get; set; }
        public int Answer { get; set; }
        [NotMapped]
        public ICollection<string> Choices { get; set; }
        public string ChoicesString
        {
            get { return string.Join(",", Choices); }
            set { Choices = value.Split(',').ToList(); }


        }
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }
    }

public class FillTheBlankQuiz
{
    [Key]
    public int Id { get; set; }
    public String QuestionText { get; set; }
    public int Point { get; set; }
    public int Time { get; set; }
    public string Answer { get; set; }
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }
}



public class DragDropQuiz
{
    [Key]
    public int Id { get; set; }
  
    public String QuestionText { get; set; }
    public int Point { get; set; }
    public int Time { get; set; }
    [NotMapped]
    public ICollection<string> Answers { get; set; }
    public string AnswersString
    {
        get { return string.Join(",", Answers); }
        set { Answers = value.Split(',').ToList(); }
    }

    [NotMapped]
    public ICollection<string> Choices { get; set; }
    public string ChoicesString
    {
        get { return string.Join(",", Choices); }
        set { Choices = value.Split(',').ToList(); }


    }
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }
}

public class MatchQuiz
{
    [Key]
    public int Id { get; set; }
    public string CustomId { get; set; }
    public int Point { get; set; }
    public int Time { get; set; }
    [NotMapped]
    public ICollection<string> Choices { get; set; }
    public string ChoicesString
    {
        get { return string.Join(",", Choices); }   
        set { Choices = value.Split(',').ToList(); }


    }
    [NotMapped]
    public ICollection<ImageChoice> ChoicesImages { get; set; }
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }

}


public class ImageChoice
{
    public int Id { get; set; }
    public string QuestionId { get; set; }
    public int AnswerIndex { get; set; } // Index of the correct answer
    [NotMapped]
    public IFormFile Files { get; set; }
    [NotMapped]
    public byte[] ImgByte { get; set; }
}

