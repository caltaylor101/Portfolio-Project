using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class BlogImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BlogId",
                table: "Photos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_BlogId",
                table: "Photos",
                column: "BlogId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Blogs_BlogId",
                table: "Photos",
                column: "BlogId",
                principalTable: "Blogs",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Blogs_BlogId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_BlogId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "BlogId",
                table: "Photos");
        }
    }
}
