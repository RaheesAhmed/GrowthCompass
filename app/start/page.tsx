import DemographicForm from "@/components/demographic-form";

export default function StartPage() {
  return (
    <div className="min-h-screen bg-slate-900 inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px] mt-6">
      <DemographicForm />
    </div>
  );
}
