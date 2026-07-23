import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="sticky top-0 z-50 border-b border-border bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-violet" />
            <span className="text-sm font-semibold text-navy">MAT 3113 Admin</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray hover:text-violet transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Site
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
