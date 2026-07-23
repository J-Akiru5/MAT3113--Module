export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-navy-mid/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-white">Instructional Material</h4>
            <p className="text-sm leading-relaxed">
              Problem Solving, Mathematical Investigation and Modeling
            </p>
            <p className="mt-1 text-xs">MAT 3113 &middot; BSEd Mathematics</p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-white">ISUFST Dingle Campus</h4>
            <p className="text-sm leading-relaxed">College of Education</p>
            <p className="text-xs leading-relaxed">Dingle, Iloilo, Philippines</p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-white">About the Author</h4>
            <p className="text-sm leading-relaxed">Dr. Irene D. Suganob</p>
            <p className="text-xs leading-relaxed">Faculty, College of Education</p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} ISUFST College of Education. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
