"use client";

import dynamic from "next/dynamic";

const NeuralzomeExperience = dynamic(() => import("@/components/NeuralzomeExperience"), {
  ssr: false,
  loading: () => (
    <main className="boot-screen" aria-label="Loading Neuralzome experience">
      <div className="boot-mark" />
      <p>Initializing field autonomy interface</p>
    </main>
  )
});

export default function ExperienceLoader() {
  return <NeuralzomeExperience />;
}
