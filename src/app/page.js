import React from 'react';
import { Leaf, Recycle, ArrowRight, Droplets, Sparkles, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-teal-50 to-green-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center">
            <img src='/img/logo.png' className="w-9 text-white" />
          </div>
          <span className="text-2xl font-bold text-green-900">Plastify</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/home" className="text-green-800 hover:text-green-600 transition">Home</Link>
          <Link href="/about" className="text-green-800 hover:text-green-600 transition">About</Link>
          <Link href="/contact" className="text-green-800 hover:text-green-600 transition">Contact</Link>
          <Link
            href={"/home"} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Circular Economy Solution</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-green-900 leading-tight">
              Transforming
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-500">
                BioWaste
              </span>
              into Bioplastics
            </h1>

            <p className="text-xl text-green-700 leading-relaxed">
              Building a sustainable future by converting organic waste into eco-friendly bioplastic materials. Join us in creating a circular economy.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={"/home"}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 transition transform hover:scale-105 shadow-lg">
                Grab Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={"/contribute"} className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-medium transition">
                Contribute
              </Link>
            </div>
          </div>

          {/* Image/Illustration Area */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-green-400/20 to-emerald-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-green-100">
              <div className="aspect-square bg-linear-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-full h-full mx-auto rounded-full flex items-center justify-center">
                    <img src="/img/logo.png" alt="brand logo" className=' border-green-500 rounded-full border-8' />
                  </div>
                  <p className="text-green-800 font-bold text-6xl flex gap-2 justify-center"><Leaf className="w-16 h-16 text-green-800" />Plastify</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-green-100">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-bold text-green-900">100% Eco</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-green-100">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-green-900">Zero Waste</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Recycle className="w-8 h-8" />,
              title: "Circular Economy",
              description: "Converting organic waste into valuable bioplastic materials, closing the loop on resource use."
            },
            {
              icon: <Leaf className="w-8 h-8" />,
              title: "100% Biodegradable",
              description: "Our bioplastics naturally decompose, leaving no harmful residues in the environment."
            },
            {
              icon: <Droplets className="w-8 h-8" />,
              title: "Reduced Carbon",
              description: "Significantly lower carbon footprint compared to traditional petroleum-based plastics."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-green-100 hover:border-green-300">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">{feature.title}</h3>
              <p className="text-green-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-linear-to-br from-green-600 to-emerald-600 rounded-3xl p-12 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">500K+</div>
              <div className="text-green-100">Tons Waste Recycled</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-green-100">Carbon Reduction</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">150+</div>
              <div className="text-green-100">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-green-900 mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
          Join us in creating a sustainable future. Let's transform waste into valuable resources together.
        </p>
        <div className="text-lg text-green-800 mb-8 max-w-2xl mx-auto font-medium">
          <p className="flex justify-center items-center gap-2 text-green-700 mb-8">
            <Leaf className="w-15 h-15 text-green-600 mb-5" />
            <span>By purchasing our products, we’ll plant a <span className="text-green-600 font-semibold">tree in your name&nbsp;</span>
              and contribute <span className="text-green-600 font-semibold">5% of every sale&nbsp;</span>
              to global clean-environment initiatives.</span>
          </p>
        </div>
      </section>
    </div>
  );
}