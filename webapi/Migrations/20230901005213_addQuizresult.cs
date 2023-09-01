using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class addQuizresult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ab238294-e740-4252-9c5c-0a0e24bd5633");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ceca9344-2d41-4039-bb3d-dc5b6c136d73");

            migrationBuilder.CreateTable(
                name: "QuizResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalPoints = table.Column<int>(type: "int", nullable: false),
                    QuizId = table.Column<int>(type: "int", nullable: false),
                    ApiUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizResults_AspNetUsers_ApiUserId",
                        column: x => x.ApiUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuizResults_Quizzes_QuizId",
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
                    { "9c207f65-0f46-49d0-a29d-78da0a099b92", null, "Admin", "ADMIN" },
                    { "9ee28151-7ba7-491d-8842-0f0e2927060d", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_ApiUserId",
                table: "QuizResults",
                column: "ApiUserId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_QuizId",
                table: "QuizResults",
                column: "QuizId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuizResults");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c207f65-0f46-49d0-a29d-78da0a099b92");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ee28151-7ba7-491d-8842-0f0e2927060d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ab238294-e740-4252-9c5c-0a0e24bd5633", null, "Admin", "ADMIN" },
                    { "ceca9344-2d41-4039-bb3d-dc5b6c136d73", null, "User", "USER" }
                });
        }
    }
}
