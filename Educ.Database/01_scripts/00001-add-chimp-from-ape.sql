create table [dbo].[Chimpanzee] (
    [Id] int not null
)
alter table [dbo].[Chimpanzee] add NoChimpRelatives int not null
alter table [dbo].[Chimpanzee] add ChimpFurColor int not null
alter table [dbo].[Chimpanzee] add constraint PK_Chimpanzee primary key (Id)
go

alter table [dbo].[Chimpanzee] add constraint FK_Ape foreign key (Id) references dbo.ApeSpecifics (Id)
go