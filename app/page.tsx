import StudyForm from "@/app/components/StudyForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        PrepWise AI
      </h1>

      <StudyForm />
    </main>
  );
}