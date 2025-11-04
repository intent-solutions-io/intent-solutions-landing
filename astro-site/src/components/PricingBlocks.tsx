export default function PricingBlocks() {
  const pricingTiers = [
    {
      name: 'discovery sprint',
      price: '$1,500',
      duration: '1–2 weeks',
      description: 'Architecture, backlog, and rollout plan to validate feasibility and scope.',
    },
    {
      name: 'mvp build',
      price: '$8K–$25K',
      duration: 'fixed-bid typical',
      description: '2–6 weeks. Scope-dependent. Includes deployment and handoff documentation.',
    },
    {
      name: 'managed service',
      price: 'from $1,497/mo',
      duration: 'flat + usage',
      description:
        'Platform operations, monitoring, on-call support. Usage billed at provider list prices.',
    },
    {
      name: 'enterprise private ai',
      price: 'from $3,000/mo',
      duration: '+ infrastructure',
      description:
        'Dedicated infrastructure, priority support, compliance documentation, SLA guarantees.',
    },
  ];

  return (
    <section className="py-16 bg-zinc-950 border-t border-zinc-800/50">
      <div className="container mx-auto px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-50 mb-8 text-center">
            transparent pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-lg font-semibold text-zinc-100">{tier.name}</h3>
                  <span className="text-sm text-zinc-400">{tier.duration}</span>
                </div>
                <div className="text-2xl font-bold text-zinc-50 mb-3">{tier.price}</div>
                <p className="text-sm text-zinc-400">{tier.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-300">Usage pricing:</strong> Beyond included quotas,
              usage is billed at provider list prices for search, storage, models, and network.
              Providers can be swapped per your policy. Prices shown are anchors—final quotes
              depend on data volume, compliance requirements, and SLA needs.
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <a
                href="/learn/pricing"
                className="text-sm text-zinc-200 hover:text-zinc-50 transition-smooth inline-flex items-center gap-2"
              >
                Learn: How pricing works
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
