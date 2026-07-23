import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value === "authenticated") {
    redirect("/admin/edit");
  } else {
    redirect("/admin/login");
  }
}
