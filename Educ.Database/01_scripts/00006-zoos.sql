CREATE TABLE [dbo].[ClosedZoos](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](max) NULL,
	[ClosingDate] [datetime] NOT NULL,
 CONSTRAINT [PK_dbo.ClosedZoos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

CREATE TABLE [dbo].[DemolishedZoo](
	[Id] [int] NOT NULL,
	[DestructionDate] [datetime] NOT NULL,
 CONSTRAINT [PK_dbo.DemolishedZoo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[DemolishedZoo]  WITH CHECK ADD  CONSTRAINT [FK_dbo.DemolishedZoo_dbo.ClosedZoos_Id] FOREIGN KEY([Id])
REFERENCES [dbo].[ClosedZoos] ([Id])
GO

ALTER TABLE [dbo].[DemolishedZoo] CHECK CONSTRAINT [FK_dbo.DemolishedZoo_dbo.ClosedZoos_Id]
GO


