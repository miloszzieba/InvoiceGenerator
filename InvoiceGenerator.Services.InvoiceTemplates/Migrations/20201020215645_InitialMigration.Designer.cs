﻿// <auto-generated />
using System;
using InvoiceGenerator.Services.InvoiceTemplates.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace InvoiceGenerator.Services.InvoiceTemplates.Migrations
{
    [DbContext(typeof(InvoiceTemplateDbContext))]
    [Migration("20201020215645_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("InvoiceGenerator.Services.InvoiceTemplates.Entities.InvoiceTemplate", b =>
                {
                    b.Property<Guid>("InvoiceTemplateId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StorageDate")
                        .HasColumnType("datetime2");

                    b.HasKey("InvoiceTemplateId");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            InvoiceTemplateId = new Guid("cfb88e29-4744-48c0-94fa-b25b92dea314"),
                            Name = "Template 1",
                            StorageDate = new DateTime(2020, 10, 20, 23, 56, 45, 22, DateTimeKind.Local).AddTicks(1109)
                        },
                        new
                        {
                            InvoiceTemplateId = new Guid("cfb88e29-4744-48c0-94fa-b25b92dea315"),
                            Name = "Template 2",
                            StorageDate = new DateTime(2020, 10, 20, 23, 56, 45, 26, DateTimeKind.Local).AddTicks(5012)
                        });
                });

            modelBuilder.Entity("InvoiceGenerator.Services.InvoiceTemplates.Entities.InvoiceTemplateContent", b =>
                {
                    b.Property<Guid>("InvoiceTemplateContentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ContentType")
                        .HasColumnType("int");

                    b.Property<Guid>("InvoiceTemplateId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("InvoiceTemplateContentId");

                    b.HasIndex("InvoiceTemplateId")
                        .IsUnique();

                    b.ToTable("Events");

                    b.HasData(
                        new
                        {
                            InvoiceTemplateContentId = new Guid("cfb88e29-4744-48c0-94fa-b25b92dea317"),
                            Content = "<div>Invoice Template 1 </div>",
                            ContentType = 1,
                            InvoiceTemplateId = new Guid("cfb88e29-4744-48c0-94fa-b25b92dea314")
                        },
                        new
                        {
                            InvoiceTemplateContentId = new Guid("cfb88e29-4744-48c0-94fa-b25b92dea319"),
                            Content = "<div>Invoice Template 2 </div>",
                            ContentType = 1,
                            InvoiceTemplateId = new Guid("cfb88e29-4744-48c0-94fa-b25b92dea315")
                        });
                });

            modelBuilder.Entity("InvoiceGenerator.Services.InvoiceTemplates.Entities.InvoiceTemplateContent", b =>
                {
                    b.HasOne("InvoiceGenerator.Services.InvoiceTemplates.Entities.InvoiceTemplate", "InvoiceTemplate")
                        .WithOne("InvoiceTemplateContent")
                        .HasForeignKey("InvoiceGenerator.Services.InvoiceTemplates.Entities.InvoiceTemplateContent", "InvoiceTemplateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
