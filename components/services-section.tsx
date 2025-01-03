import { Wallet, CreditCard, PiggyBank, LineChart, Receipt, Building2 } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      icon: <PiggyBank className="h-9 w-9 text-[#E97681]" />,
      title: "Savings accounts",
      description: "Bean Bank is all about a variety of saving opportunities with attractive rates and no hidden charges. Open a savings account with us today and enjoy the benefits of premium interest rates and excellent banking system."
    },
    {
      icon: <Wallet className="h-9 w-9 text-[#E97681]" />,
      title: "Personal loans",
      description: "Bean Bank offers affordable personal loans for a variety of needs with great rates and flexible repayment options. Apply for a personal loan today and get the financial support you need to achieve your goals."
    },
    {
      icon: <CreditCard className="h-9 w-9 text-[#E97681]" />,
      title: "Credit cards",
      description: "Bean Bank credit cards come with different benefits and rewards. Choose from our selection of credit cards and enjoy cashback, rewards, and special offers for a superior banking experience."
    },
    {
      icon: <LineChart className="h-9 w-9 text-[#E97681]" />,
      title: "Investment services",
      description: "Let our experts help you grow your wealth with our investment services. We offer personalized investment advice, portfolio management, and access to a wide range of investment options."
    },
    {
      icon: <Receipt className="h-9 w-9 text-[#E97681]" />,
      title: "Online bill pay",
      description: "Save time and effort by managing all your bills in one place. Our online bill pay service makes it easy to pay your bills on time, every time. Set up automatic payments and never miss a due date again."
    },
    {
      icon: <Building2 className="h-9 w-9 text-[#E97681]" />,
      title: "Business banking",
      description: "Bean Bank offers dedicated business banking solutions for companies of all sizes. From basic business accounts to merchant services and credit facilities, we have everything you need to grow your business."
    }
  ]

  return (
    <section className="container mx-auto px-4 py-16 bg-white ">
      <h2 className="mb-12 text-3xl font-bold">Services</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} className="flex gap-4 rounded-lg p-4 transition-colors hover:bg-white/50">
            <div className="">
              {service.icon}
            </div>
            <div>
              <h3 className="font-semibold text-[#33B786]">{service.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

