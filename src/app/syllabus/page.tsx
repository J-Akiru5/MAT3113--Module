export default function SyllabusPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="container-book">
        <span className="text-xs font-semibold uppercase tracking-widest text-violet">
          MAT 3113
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
          Course Syllabus
        </h1>
        <p className="mt-3 text-gray">
          Official course syllabus for Problem Solving, Mathematical Investigation and Modeling.
        </p>

        <div className="mt-10 space-y-8">
          <Section title="Course Information">
            <InfoRow label="Course Code" value="MAT 3113" />
            <InfoRow
              label="Course Title"
              value="Problem Solving, Mathematical Investigation and Modeling"
            />
            <InfoRow label="Program" value="Bachelor of Secondary Education — Mathematics" />
            <InfoRow label="Institution" value="ISUFST, Dingle Campus, College of Education" />
          </Section>

          <Section title="Institutional Mandate">
            <p className="text-sm text-gray">
              The ISUFST College of Education is committed to developing competent and
              values-oriented educators through quality instruction, research, and community
              engagement.
            </p>
          </Section>

          <Section title="Vision">
            <p className="text-sm text-gray">
              A premier college of education producing globally competitive teachers and educational
              leaders.
            </p>
          </Section>

          <Section title="Mission">
            <p className="text-sm text-gray">
              To provide quality teacher education that develops highly competent, ethical, and
              socially responsible professionals.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-navy border-b border-border pb-2 mb-4">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <dt className="text-sm font-semibold text-navy w-40 shrink-0">{label}</dt>
      <dd className="text-sm text-gray">{value}</dd>
    </div>
  );
}
