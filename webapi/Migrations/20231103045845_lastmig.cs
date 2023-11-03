using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class lastmig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "50473d7b-bb1a-4c2a-81ec-4adaf5e8382e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a38f501f-fe91-441c-a1c2-ee1a979b205a");

            migrationBuilder.RenameColumn(
                name: "Answer",
                table: "fillTheBlankQuizzes",
                newName: "AnswersString");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "046f474d-4215-4f5a-bca4-be767172cffe", null, "User", "USER" },
                    { "866bd92e-dee6-4ee7-9453-cae131a0617e", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "046f474d-4215-4f5a-bca4-be767172cffe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "866bd92e-dee6-4ee7-9453-cae131a0617e");

            migrationBuilder.RenameColumn(
                name: "AnswersString",
                table: "fillTheBlankQuizzes",
                newName: "Answer");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "50473d7b-bb1a-4c2a-81ec-4adaf5e8382e", null, "User", "USER" },
                    { "a38f501f-fe91-441c-a1c2-ee1a979b205a", null, "Admin", "ADMIN" }
                });
        }
    }
}
