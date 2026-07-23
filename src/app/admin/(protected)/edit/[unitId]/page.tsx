import { notFound } from "next/navigation";
import { UnitEditor } from "@/components/admin/unit-editor";
import { loadUnit } from "@/lib/content-loader";

interface Props {
  params: Promise<{ unitId: string }>;
}

export default async function EditUnitPage({ params }: Props) {
  const { unitId } = await params;

  try {
    const unit = loadUnit(unitId);
    return <UnitEditor unit={unit} />;
  } catch {
    notFound();
  }
}
