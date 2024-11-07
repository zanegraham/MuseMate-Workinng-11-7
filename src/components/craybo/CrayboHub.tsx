// Previous imports remain...
import { Music2, Truck, Palette, ArrowRight, Zap, Users2, Calendar, ShoppingBag, Sparkles } from 'lucide-react';

export default function CrayboHub() {
  // Previous code remains...

  const merchandiseServices = [
    {
      title: 'Custom Band Merch',
      description: 'Create custom t-shirts, hoodies, and more for your band',
      icon: ShoppingBag,
      features: [
        'High-quality screen printing',
        'Multiple design options',
        'Bulk ordering available',
        'Fast turnaround times'
      ],
      cta: 'Start Designing',
      url: 'https://craybo.com/merch/design'
    },
    {
      title: 'Artist Collaboration',
      description: 'Work with local artists to create unique merchandise designs',
      icon: Palette,
      features: [
        'Connect with local artists',
        'Custom artwork creation',
        'Exclusive designs',
        'Artist revenue sharing'
      ],
      cta: 'Find Artists',
      url: 'https://craybo.com/artists'
    },
    {
      title: 'Print on Demand',
      description: 'No minimum order quantities, print as needed',
      icon: Sparkles,
      features: [
        'No upfront inventory',
        'Multiple product types',
        'Direct shipping to customers',
        'Integrated with your events'
      ],
      cta: 'Learn More',
      url: 'https://craybo.com/merch/pod'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Previous sections remain... */}

      <div>
        <div className="flex items-center gap-2 mb-6">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Merchandise Lab</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {merchandiseServices.map((service, index) => (
            <div key={index} className="card p-6 hover:border-indigo-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 
                            flex items-center justify-center mb-4
                            group-hover:bg-indigo-100 transition-colors">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                {service.cta}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Ready to Create Your Merch?
            </h2>
            <p className="text-gray-600">
              Get started with our easy-to-use design tools and professional printing services
            </p>
          </div>
          <a
            href="https://craybo.com/merch/start"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap"
          >
            Launch Design Studio
          </a>
        </div>
      </div>
    </div>
  );
}