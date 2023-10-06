using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class adsfj : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2aa1cb30-bcd3-4ed4-81fa-e94324931c0d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fd32ea0-c548-4b49-8540-7675c89b919c");

            migrationBuilder.AddColumn<string>(
                name: "ApiUserId",
                table: "Quizzes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Quizzes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "50473d7b-bb1a-4c2a-81ec-4adaf5e8382e", null, "User", "USER" },
                    { "a38f501f-fe91-441c-a1c2-ee1a979b205a", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_ApiUserId",
                table: "Quizzes",
                column: "ApiUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_AspNetUsers_ApiUserId",
                table: "Quizzes",
                column: "ApiUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_AspNetUsers_ApiUserId",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_Quizzes_ApiUserId",
                table: "Quizzes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "50473d7b-bb1a-4c2a-81ec-4adaf5e8382e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a38f501f-fe91-441c-a1c2-ee1a979b205a");

            migrationBuilder.DropColumn(
                name: "ApiUserId",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Quizzes");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2aa1cb30-bcd3-4ed4-81fa-e94324931c0d", null, "User", "USER" },
                    { "8fd32ea0-c548-4b49-8540-7675c89b919c", null, "Admin", "ADMIN" }
                });
        }
    }
}
