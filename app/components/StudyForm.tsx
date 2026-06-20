// "use client";
// import { useState } from "react";

// export default function StudyForm() {
//   const [subject, setSubject] = useState("");
//   const [topics, setTopics] = useState("");
//   const [examDate, setExamDate] = useState("");

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
//       <input
//         placeholder="Subject"
//         className="w-full border p-2 mb-4"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//       />

//       <textarea
//         placeholder="Topics (comma separated)"
//         className="w-full border p-2 mb-4"
//         value={topics}
//         onChange={(e) => setTopics(e.target.value)}
//       />

//       <input
//         type="date"
//         className="w-full border p-2 mb-4"
//         value={examDate}
//         onChange={(e) => setExamDate(e.target.value)}
//       />

//       <button className="bg-blue-600 text-white px-4 py-2 rounded">
//         Generate Plan
//       </button>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudyForm() {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [examDate, setExamDate] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!subject || !topics || !examDate) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject,
          topics,
          examDate
        })
      });

      const data = await res.json();
      setPlan(data.plan);

      await supabase.from("study_plans").insert([
        {
          subject,
          topics,
          exam_date: examDate,
          plan: data.plan
        }
      ]);
    } catch (error) {
      console.log(error);
      alert("Error generating plan");
    }

    setLoading(false);
  };

  return (
  <div className="backdrop-blur-md bg-white/90 shadow-2xl rounded-3xl p-8 max-w-2xl mx-auto">
    <input
      className="w-full p-4 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter Subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
    />

    <textarea
      className="w-full p-4 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter Topics (comma separated)"
      rows={5}
      value={topics}
      onChange={(e) => setTopics(e.target.value)}
    />

    <input
      type="date"
      className="w-full p-4 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={examDate}
      onChange={(e) => setExamDate(e.target.value)}
    />

    <button
      onClick={generatePlan}
      className="w-full py-4 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:scale-[1.02] transition"
    >
      {loading ? "Generating..." : "Generate Plan"}
    </button>

    {plan && (
      <div className="mt-6 bg-gray-900 text-green-400 p-6 rounded-2xl shadow-inner">
        <h2 className="text-xl font-bold text-white mb-3">
          Generated Study Plan
        </h2>
        <pre className="whitespace-pre-wrap text-sm leading-7">
          {plan}
        </pre>
      </div>
    )}
  </div>
);
}