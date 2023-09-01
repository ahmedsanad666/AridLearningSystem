namespace webapi.Models
{
    public class QuizResult
    {
        public int Id { get; set; }
        public int TotalPoints { get; set; }

        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }
        public string ApiUserId { get; set; }
        public ApiUser ApiUser { get; set; }
    }
}
