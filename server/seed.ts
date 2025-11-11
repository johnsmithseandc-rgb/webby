import { db } from "./db";
import { questions } from "@shared/schema";

const apQuestions = [
  {
    subject: "araling-panlipunan",
    questionText: "Ano ang tawag sa pag-aaral kung paano tutugunan ng tao ang tila walang katapusang pangangailangan gamit ang limitadong pinagkukunang-yaman?",
    answers: [
      { text: "a. Sosyolohiya", correct: false },
      { text: "b. Ekonomiks", correct: true },
      { text: "c. Sikolohiya", correct: false },
      { text: "d. Alokasyon", correct: false }
    ]
  },
  {
    subject: "araling-panlipunan",
    questionText: "Ito ay tumutukoy sa isang sitwasyon kung saan ang mga pinagkukunang-yaman ay limitado upang matugunan ang walang hanggang pangangailangan at kagustuhan ng tao.",
    answers: [
      { text: "a. Kakulangan", correct: false },
      { text: "b. Kagustuhan", correct: false },
      { text: "c. Kakapusan", correct: true },
      { text: "d. Pagkonsumo", correct: false }
    ]
  },
  {
    subject: "araling-panlipunan",
    questionText: "Ayon kay Abraham Maslow, ano ang pinakamataas na antas ng pangangailangan na nais makamit ng isang tao?",
    answers: [
      { text: "a. Seguridad (Safety needs)", correct: false },
      { text: "b. Pisyolohikal (Physiological needs)", correct: false },
      { text: "c. Kaganapan ng Pagkatao (Self-Actualization)", correct: true },
      { text: "d. Pagmamahal (Love and belonging)", correct: false }
    ]
  },
  {
    subject: "araling-panlipunan",
    questionText: "Anong sistema ng ekonomiya ang nakabatay sa tradisyon, kultura, at paniniwala ng isang lipunan?",
    answers: [
      { text: "a. Traditional Economy", correct: true },
      { text: "b. Market Economy", correct: false },
      { text: "c. Command Economy", correct: false },
      { text: "d. Mixed Economy", correct: false }
    ]
  },
  {
    subject: "araling-panlipunan",
    questionText: "Ito ay tumutukoy sa proseso ng pagpili at paggamit ng mga produkto at serbisyo upang matugunan ang mga pangangailangan.",
    answers: [
      { text: "a. Produksyon", correct: false },
      { text: "b. Pagkonsumo", correct: true },
      { text: "c. Distribusyon", correct: false },
      { text: "d. Alokasyon", correct: false }
    ]
  }
];

async function seed() {
  console.log("Seeding database...");
  
  for (const question of apQuestions) {
    await db.insert(questions).values(question);
  }
  
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
