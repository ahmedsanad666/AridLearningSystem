using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class AddfillQuizs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7cf56665-4f4f-4442-949d-08128999e01a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a70857aa-f3ed-43bb-9c2e-dc16e49b25d2");

            migrationBuilder.CreateTable(
                name: "DragDropQuizzes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Point = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<int>(type: "int", nullable: false),
                    AnswersString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChoicesString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuizId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DragDropQuizzes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DragDropQuizzes_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatchQuizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Point = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<int>(type: "int", nullable: false),
                    ChoicesString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuizId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchQuizes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchQuizes_Quizzes_QuizId",
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
                    { "d894f04c-dcb4-44a2-87a1-e617c62d35eb", null, "Admin", "ADMIN" },
                    { "de37def8-d1fd-447a-9379-87d68de88181", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_DragDropQuizzes_QuizId",
                table: "DragDropQuizzes",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchQuizes_QuizId",
                table: "MatchQuizes",
                column: "QuizId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DragDropQuizzes");

            migrationBuilder.DropTable(
                name: "MatchQuizes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d894f04c-dcb4-44a2-87a1-e617c62d35eb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "de37def8-d1fd-447a-9379-87d68de88181");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7cf56665-4f4f-4442-949d-08128999e01a", null, "Admin", "ADMIN" },
                    { "a70857aa-f3ed-43bb-9c2e-dc16e49b25d2", null, "User", "USER" }
                });
        }
    }
}
