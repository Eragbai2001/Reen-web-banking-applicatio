import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "How do I sign up for an account with Bean Bank?",
      answer:
        "You can sign up for an account with Bean Bank online by visiting our website and filling in the simple application form. Your application will be processed instantly, and once approved, you'll be able to start banking with us.",
    },
    {
      question: "What types of accounts does Bean Bank offer?",
      answer:
        "Bean Bank offers a variety of accounts including savings accounts, checking accounts, business accounts, and investment accounts. Each account type comes with its own set of features and benefits.",
    },
    {
      question:
        "Can I get a credit card from Bean Bank without a credit history?",
      answer:
        "Yes, Bean Bank offers secured credit cards for individuals who are new to credit or working to rebuild their credit history. These cards require a security deposit and help establish credit history.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 flex justify-between items-center body  ">
      <div className="flex flex-col gap-8 ">
        <h2 className="mb-2 text-3xl font-bold">FAQs</h2>
        <h2
          className="underline font-bold
         text-[#33B786]"
        >
          How do I sign up for an account with Reen Bank?
        </h2>
        <p className="w-[34rem] text-xs ">
          You can sign up for an account with Reen Bank online by visiting our
          website and filling out the online application form. Once your
          application is approved, you will receive instructions for setting up
          your account and accessing our online banking platform.
        </p>
      </div>
      <div className="mx-auto max-w-3xl items-start ">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-[#46237A]">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
