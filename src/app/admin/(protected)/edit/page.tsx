import { Edit, GripVertical } from "lucide-react";
import Link from "next/link";
import { loadAllUnits } from "@/lib/content-loader";

export default function AdminDashboard() {
  const units = loadAllUnits();

  return (
    <div className="py-10">
      <div className="container-book">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy">Module Editor</h1>
            <p className="mt-1 text-sm text-gray">Manage units, sections, and content blocks</p>
          </div>
          <Link
            href="/api/admin/save-draft"
            className="rounded-lg bg-violet px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet/20 transition-all hover:bg-violet-strong"
          >
            Save Changes to Draft
          </Link>
        </div>

        <div className="card mb-8">
          <h2 className="mb-4 font-display text-lg font-bold text-navy">Table of Contents</h2>
          <p className="mb-4 text-sm text-gray">Drag to reorder units across the whole book.</p>
          <div className="space-y-1">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-3 transition-colors hover:border-violet/40"
              >
                <button
                  type="button"
                  className="cursor-grab text-gray hover:text-violet"
                  aria-label="Drag to reorder"
                >
                  <GripVertical className="h-4 w-4" />
                </button>
                <div className="flex-1">
                  <span className="text-sm font-medium text-navy">{unit.title}</span>
                  <span className="ml-2 text-xs text-gray">
                    {unit.sections.length} section{unit.sections.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <Link
                  href={`/admin/edit/${unit.id}`}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:bg-violet-soft hover:text-violet-strong"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/admin/login" className="text-sm text-gray hover:text-violet">
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}
