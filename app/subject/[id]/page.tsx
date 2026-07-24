import { subjects } from "@/data";
import { SubjectClient } from "./SubjectClient";

/**
 * 静的書き出し（output: "export"）では、動的ルートのURLを
 * ビルド時にすべて列挙する必要がある。科目は3つに固定なのでそのまま返す。
 */
export function generateStaticParams() {
  return subjects.map((subject) => ({ id: subject.id }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SubjectClient id={id} />;
}
