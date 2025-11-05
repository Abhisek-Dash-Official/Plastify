import { Recycle, Earth, Gift } from "lucide-react"

export default function About() {
    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100">
            {/* Hero Section */}
            <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">About Plastify</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Transforming waste into a sustainable future, one contribution at a time
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-green-700 mb-6">Our Mission</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                At Plastify, we believe in creating a cleaner, greener planet by making waste management accessible and rewarding for everyone. Our platform bridges the gap between environmental consciousness and practical action.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                We empower individuals and communities to contribute to a sustainable future through innovative waste recycling solutions and meaningful incentives.
                            </p>
                        </div>
                        <div className="bg-linear-to-br from-green-100 to-emerald-100 rounded-xl p-8">
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                                        <span className="text-2xl"><Recycle /></span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-green-800 mb-2">Eco-Friendly</h3>
                                        <p className="text-gray-600">Reducing environmental impact through responsible recycling</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                                        <span className="text-2xl"><Earth /></span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-green-800 mb-2">Community Driven</h3>
                                        <p className="text-gray-600">Building a global community of environmental champions</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                                        <span className="text-2xl"><Gift /></span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-green-800 mb-2">Rewarding</h3>
                                        <p className="text-gray-600">Earn incentives for every eco-friendly action you take</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
                        <div className="text-5xl font-bold text-green-600 mb-2">10K+</div>
                        <p className="text-gray-600 font-semibold">Contributors</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
                        <div className="text-5xl font-bold text-green-600 mb-2">500T</div>
                        <p className="text-gray-600 font-semibold">Plastic Recycled</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
                        <div className="text-5xl font-bold text-green-600 mb-2">50+</div>
                        <p className="text-gray-600 font-semibold">Partner Cities</p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
                    <h2 className="text-4xl font-bold mb-8 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-3">Sustainability</h3>
                            <p className="text-green-100">
                                Creating long-term environmental solutions that benefit future generations
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-3">Innovation</h3>
                            <p className="text-green-100">
                                Leveraging technology to make recycling easier and more impactful
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-3">Transparency</h3>
                            <p className="text-green-100">
                                Honest reporting on our environmental impact and operations
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}