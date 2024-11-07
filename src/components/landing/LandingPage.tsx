import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Users, CheckSquare, Zap, ArrowRight, Music, Package2,
  Share2, Sparkles, BarChart3, Palette, Truck, ShoppingBag
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-indigo-100 text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              The Ultimate Event Planning Platform for Creatives
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Create, Share & Manage<br />Your Creative Events
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Everything you need to bring your creative vision to life - from planning and inventory 
              management to beautiful shareable event pages
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sign-up"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base 
                         font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 
                         shadow-lg shadow-indigo-500/25 transition-all duration-200 
                         hover:scale-105 md:text-lg"
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center px-8 py-3 border border-white/20 text-base 
                         font-medium rounded-lg text-white hover:bg-white/10 backdrop-blur-sm 
                         transition-all duration-200 md:text-lg"
              >
                See Features <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Floating Preview Cards */}
        <div className="hidden lg:block absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
          <div className="relative">
            {/* Event Card Preview */}
            <div className="absolute -left-64 bottom-0 w-64 bg-white rounded-lg shadow-xl p-4 transform -rotate-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h3 className="font-medium">Summer Music Festival</h3>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              </div>
            </div>

            {/* Share Preview */}
            <div className="absolute -right-64 bottom-0 w-64 bg-white rounded-lg shadow-xl p-4 transform rotate-6">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 mb-3">
                <div className="p-4 text-white text-center">
                  <Share2 className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Share your event</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Create Amazing Events
            </h2>
            <p className="text-xl text-gray-600">
              Powerful tools designed for creative professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Event Planning",
                description: "Create beautiful event pages and manage every detail with our intuitive planning tools",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Share2,
                title: "Beautiful Sharing",
                description: "Generate stunning social media cards and easily share your events across platforms",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Package2,
                title: "Inventory Tracking",
                description: "Keep track of all your equipment, merchandise, and rentals in one place",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Monitor ticket sales, attendance, and engagement with detailed analytics",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work seamlessly with your team, vendors, and artists in real-time",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: CheckSquare,
                title: "Smart Checklists",
                description: "Never miss a detail with customizable checklists and task management",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white p-6 rounded-xl border border-gray-200 
                         hover:border-indigo-500 transition-all duration-200"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} 
                              opacity-0 group-hover:opacity-5 transition-all duration-200`} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 
                              flex items-center justify-center mb-4 group-hover:scale-110 
                              transition-transform duration-200">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Craybo Integration Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 
                         text-indigo-800 text-sm mb-4">
              <Music className="w-4 h-4" />
              Powered by Craybo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Production Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access Craybo's full suite of professional event production services directly through MuseMate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: "Event Production",
                description: "Professional sound, lighting, and stage design services",
                features: ["Technical planning", "Equipment setup", "On-site support"]
              },
              {
                icon: Truck,
                title: "Equipment Rental",
                description: "High-quality audio and lighting equipment rentals",
                features: ["Professional gear", "Delivery available", "Technical support"]
              },
              {
                icon: ShoppingBag,
                title: "Merchandise Lab",
                description: "Create and manage your event merchandise",
                features: ["Custom designs", "Print on demand", "Inventory management"]
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-sm rounded-xl border border-indigo-100/50 p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 
                             text-white flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Your Next Event?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join the creative community and start planning unforgettable experiences
            </p>
            <Link
              to="/sign-up"
              className="inline-flex items-center px-8 py-3 border border-transparent text-lg 
                       font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 
                       shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105"
            >
              Get Started Free <Sparkles className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <Zap className="w-6 h-6" />
                <span className="font-bold text-xl">MuseMate</span>
              </div>
              <p className="text-gray-400">
                Empowering creatives to bring their ideas to life
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://twitter.com/craybo" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/craybo" className="text-gray-400 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://craybo.com" className="text-gray-400 hover:text-white">
                    Website
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:hello@craybo.com" className="text-gray-400 hover:text-white">
                    hello@craybo.com
                  </a>
                </li>
                <li className="text-gray-400">
                  Based in Los Angeles, CA
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Craybo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}