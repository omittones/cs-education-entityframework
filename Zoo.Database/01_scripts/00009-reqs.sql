CREATE TABLE [dbo].[ReqOne](
[Id] [int] IDENTITY(1,1) NOT NULL,
CONSTRAINT [PK_dbo.ReqOne] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
GO

CREATE TABLE [dbo].[ReqTwo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
CONSTRAINT [PK_dbo.ReqTwo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
GO

CREATE TABLE [dbo].[Dependent](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ReqOneId] [int] NULL,
	[ReqTwoId] [int] NULL,
CONSTRAINT [PK_dbo.Dependent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
GO

ALTER TABLE [dbo].[Dependent]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Dependent_dbo.Dependent_ReqOneId] FOREIGN KEY([ReqOneId])
REFERENCES [dbo].[Dependent] ([Id])
GO

ALTER TABLE [dbo].[Dependent]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Dependent_dbo.Dependent_ReqTwoId] FOREIGN KEY([ReqTwoId])
REFERENCES [dbo].[Dependent] ([Id])
GO