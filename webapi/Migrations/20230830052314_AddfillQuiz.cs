using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class AddfillQuiz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1a8985b6-87e2-48ff-bbfd-7af669591b49");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a4010adc-2900-41f2-94bc-e22ec3869462");

            migrationBuilder.CreateTable(
                name: "fillTheBlankQuizzes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Point = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<int>(type: "int", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuizId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_fillTheBlankQuizzes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_fillTheBlankQuizzes_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7cf56665-4f4f-4442-949d-08128999e01a", null, "Admin", "ADMIN" },
                    { "a70857aa-f3ed-43bb-9c2e-dc16e49b25d2", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_fillTheBlankQuizzes_QuizId",
                table: "fillTheBlankQuizzes",
                column: "QuizId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "fillTheBlankQuizzes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7cf56665-4f4f-4442-949d-08128999e01a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a70857aa-f3ed-43bb-9c2e-dc16e49b25d2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1a8985b6-87e2-48ff-bbfd-7af669591b49", null, "Admin", "ADMIN" },
                    { "a4010adc-2900-41f2-94bc-e22ec3869462", null, "User", "USER" }
                });
        }
    }
}
