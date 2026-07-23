export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="container-book">
        <span className="text-xs font-semibold uppercase tracking-widest text-violet">About</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
          About the Author
        </h1>

        <div className="mt-10 card">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl bg-violet-soft text-violet">
              <span className="font-display text-4xl font-bold">IDS</span>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Dr. Irene D. Suganob</h2>
              <p className="mt-1 text-sm text-violet font-medium">Faculty, College of Education</p>
              <p className="text-sm text-gray">ISUFST Dingle Campus</p>
              <p className="mt-4 text-gray leading-relaxed">
                Dr. Irene D. Suganob is a dedicated faculty member of the College of Education at
                ISUFST Dingle Campus. She authored this instructional module in Problem Solving,
                Mathematical Investigation and Modeling to support BSEd Mathematics students in
                developing critical thinking and mathematical inquiry skills.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-navy mb-4">About the Module</h2>
          <p className="text-gray leading-relaxed">
            This interactive web-based module covers the complete MAT 3113 syllabus, including 5
            instructional units, appendices, rubrics, worksheets, and guided mathematical
            investigations. It is designed as both a teaching resource for instructors and a
            self-study tool for students.
          </p>
        </div>
      </div>
    </div>
  );
}
