"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlanCard from "@/app/components/PlanCard";

type StudyPlan = {
  id: number;
  subject: string;
  topics: string;
  exam_date: string;
  plan: string;
};

export default function PlansPage() {
  const [plans, setPlans] = useState<StudyPlan[]>([]);

  useEffect(() => {
    async function fetchPlans() {
      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setPlans(data);
      }
    }

    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Saved Plans</h1>

      {plans.map((plan) => (
        <PlanCard key={plan.id} planData={plan} />
      ))}
    </div>
  );
}
