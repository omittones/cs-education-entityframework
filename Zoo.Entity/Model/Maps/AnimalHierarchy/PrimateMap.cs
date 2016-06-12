using System.Data.Entity.ModelConfiguration;

namespace Zoo.Entity.Model.Maps.AnimalHierarchy
{
    public class PrimateMap : EntityTypeConfiguration<Primate>
    {
        public PrimateMap()
        {
            this.Property(a => a.Name)
                .HasColumnName("PrimateName")
                .HasColumnType("nvarchar");

            this.Property(a => a.TrainerEmployeeId)
                .HasColumnName("PrimateTrainerEmployeeId");

            this.HasRequired(e => e.Trainer)
                .WithMany()
                .HasForeignKey(e => e.TrainerEmployeeId);

            this.Map(m =>
            {
                m.ToTable("Animal");
                m.Requires("Type").HasValue((int) AnimalType.Primate);
                m.Properties(t => new { });
            });

            this.Map(m =>
            {
                m.ToTable("PrimateSpecifics");
                m.Properties(t => new { t.Name, t.TrainerEmployeeId });
            });
        }
    }
}