import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@roprgm/ui/accordion";
import { Card } from "@roprgm/ui/card";
import { Chevron } from "@roprgm/ui/chevron";

const questions = [
  {
    question: "Are my originals changed?",
    answer: "No. Edits are kept beside the photo, so you can revert any time.",
  },
  {
    question: "Which formats can I export?",
    answer: "JPEG, PNG, and TIFF, at any size up to the original's.",
  },
  {
    question: "Can I sync presets?",
    answer: "Yes. Presets sync to every device you sign in on.",
  },
];

export default function AccordionDemo() {
  return (
    <Card className="w-72">
      <Accordion>
        {questions.map((item) => (
          <AccordionItem key={item.question}>
            <AccordionTrigger>
              <Chevron
                direction="right"
                className="text-secondary group-data-open/collapsible:rotate-90"
              />
              {item.question}
            </AccordionTrigger>
            <AccordionPanel className="text-secondary">
              {item.answer}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
