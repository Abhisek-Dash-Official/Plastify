import Link from 'next/link';
import {
    Sprout,
    UtensilsCrossed,
    Home,
    Store,
    Trees,
    Building2,
    Recycle,
    Droplet,
    Factory,
    ShieldCheck,
    Truck,
    Package,
    Leaf,
    RefreshCw,
    ThumbsUp,
    ArrowRight,
    Milk,
    PackageOpen,
    Utensils,
    Handbag,
    Backpack
} from 'lucide-react';

export default function LearnMore() {
    const products = [
        { title: 'Bottles', Icon: Milk },
        { title: 'Containers', Icon: PackageOpen },
        { title: 'Cutlery', Icon: Utensils },
        { title: 'Bags', Icon: Backpack },
        { title: 'Accessories', Icon: Handbag }
    ];

    const wasteSourcesData = [
        {
            title: "Agricultural Waste",
            description: "Crop residues, corn stalks, sugarcane bagasse, and other plant-based materials",
            Icon: Sprout
        },
        {
            title: "Food Industry Waste",
            description: "Vegetable peels, fruit waste, and organic byproducts from food processing",
            Icon: UtensilsCrossed
        },
        {
            title: "Household Bio-Waste",
            description: "Kitchen scraps, food leftovers, and compostable organic materials",
            Icon: Home
        },
        {
            title: "Restaurant & Cafeteria Waste",
            description: "Organic waste from commercial kitchens and food service establishments",
            Icon: Store
        },
        {
            title: "Garden Waste",
            description: "Grass clippings, leaves, branches, and other yard trimmings",
            Icon: Trees
        },
        {
            title: "Municipal Organic Waste",
            description: "Community composting programs and organic waste collection centers",
            Icon: Building2
        }
    ];

    const processSteps = [
        {
            step: "01",
            title: "Collection",
            description: "We collect bio-waste from various sources including households, restaurants, farms, and food processing units through our partner network and community drop-off centers.",
            color: "from-green-400 to-green-600",
            Icon: Recycle
        },
        {
            step: "02",
            title: "Sorting & Cleaning",
            description: "The collected waste is carefully sorted to remove contaminants and non-organic materials. Clean bio-waste is then processed through our advanced cleaning systems.",
            color: "from-emerald-400 to-emerald-600",
            Icon: Droplet
        },
        {
            step: "03",
            title: "Bio-Conversion",
            description: "Using cutting-edge biotechnology, we convert organic waste into bio-plastic polymers through bacterial fermentation and enzymatic processes, creating PHA and PLA materials.",
            color: "from-teal-400 to-teal-600",
            Icon: Leaf
        },
        {
            step: "04",
            title: "Manufacturing",
            description: "The bio-plastic material is processed and molded into various products like bottles, containers, cutlery, bags, and accessories in our state-of-the-art facilities.",
            color: "from-cyan-400 to-cyan-600",
            Icon: Factory
        },
        {
            step: "05",
            title: "Quality Control",
            description: "Every product undergoes rigorous testing to ensure durability, safety, and biodegradability standards are met before reaching our customers.",
            color: "from-blue-400 to-blue-600",
            Icon: ShieldCheck
        },
        {
            step: "06",
            title: "Distribution",
            description: "Products are packaged using eco-friendly materials and distributed through our online platform and partner retailers across the country.",
            color: "from-indigo-400 to-indigo-600",
            Icon: Truck
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100">
            {/* Hero Section */}
            <div className="relative bg-linear-to-r from-green-600 to-emerald-600 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 py-24 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            The Plastify Journey
                        </h1>
                        <p className="text-xl md:text-2xl text-green-100">
                            From Bio-Waste to Sustainable Products - A Complete Circular Economy
                        </p>
                    </div>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
                    <h2 className="text-4xl font-bold text-green-700 mb-6 text-center">What We Do</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Plastify is revolutionizing waste management and sustainable manufacturing through our innovative circular economy model. We transform organic bio-waste that would otherwise end up in landfills into high-quality, biodegradable plastic products.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Our mission is simple yet powerful: <span className="font-bold text-green-600">reduce environmental pollution, create sustainable alternatives to traditional plastics, and empower communities to participate in the green revolution.</span>
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Every product we create not only serves a practical purpose but also represents a step toward a cleaner, greener planet. We're not just selling products; we're building a sustainable future.
                    </p>
                </div>

                {/* Bio-Waste Sources */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-green-700 mb-4 text-center">Where We Source Bio-Waste</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        We partner with various sectors to collect organic waste materials that form the foundation of our bio-plastic products
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wasteSourcesData.map((source, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition-all">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <source.Icon className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-green-700 mb-3">{source.title}</h3>
                                <p className="text-gray-600">{source.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Process Steps */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-green-700 mb-4 text-center">Our Manufacturing Process</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                        Follow the journey from organic waste to premium bio-plastic products
                    </p>

                    <div className="space-y-8">
                        {processSteps.map((process, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all">
                                <div className="md:flex">
                                    <div className={`md:w-1/4 bg-linear-to-br ${process.color} p-8 flex flex-col items-center justify-center`}>
                                        <process.Icon className="w-16 h-16 text-white mb-4" />
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-white mb-2">{process.step}</div>
                                            <div className="text-white font-semibold text-xl">{process.title}</div>
                                        </div>
                                    </div>
                                    <div className="md:w-3/4 p-8 flex items-center">
                                        <p className="text-gray-700 text-lg leading-relaxed">{process.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Products Section */}
                <div className="mb-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <h2 className="text-4xl font-bold text-green-700 mb-6 text-center">Our Product Range</h2>
                    <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
                        We manufacture a wide variety of bio-plastic products designed to replace traditional plastic items in your daily life
                    </p>

                    <div className="grid md:grid-cols-5 gap-6 mb-8">
                        {products.map((product, index) => (
                            <div key={index} className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center transform hover:scale-105 transition-all border-2 border-green-200">
                                <div className='flex justify-center items-center'>
                                    <div className='w-20 flex'>
                                        <product.Icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                        <Package className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                    </div>
                                </div>
                                <h3 className="font-bold text-xl text-green-700">{product.title}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="bg-linear-to-r from-green-100 to-emerald-100 rounded-xl p-6">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Each product category includes multiple designs and sizes to meet diverse customer needs. From reusable water bottles and food containers to eco-friendly cutlery sets, shopping bags, and everyday accessories - all made from 100% biodegradable materials.
                        </p>
                    </div>
                </div>

                {/* Circular Economy Section */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-green-700 mb-6 text-center">The Circular Economy Model</h2>
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                                    <ThumbsUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-green-700 mb-3">Customer Use Phase</h3>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        Customers purchase and use our bio-plastic products in their daily lives, enjoying the same functionality as traditional plastic but with environmental benefits. Our products are durable, safe, and designed for repeated use.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                                    <RefreshCw className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-green-700 mb-3">End-of-Life Options</h3>
                                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                        After using our products, customers have two eco-friendly options:
                                    </p>
                                    <div className="space-y-4 ml-4">
                                        <div className="flex items-start space-x-3">
                                            <ArrowRight className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                                            <div>
                                                <p className="font-semibold text-gray-800 mb-1">Option 1: Donate Back to Plastify</p>
                                                <p className="text-gray-600">
                                                    Return used products or household bio-waste to our collection centers. We reward contributors with discount coupons and certificates, encouraging continued participation in our circular economy.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <ArrowRight className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                                            <div>
                                                <p className="font-semibold text-gray-800 mb-1">Option 2: Natural Disposal</p>
                                                <p className="text-gray-600">
                                                    Simply dispose of the products with regular waste. Unlike traditional plastics, our bio-plastic products naturally decompose within 6-12 months without releasing harmful toxins or microplastics into the environment.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                                    <Recycle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-green-700 mb-3">Recycling & Regeneration</h3>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        Donated bio-waste and used products are processed back into raw materials, completing the circle. This regenerative process reduces the need for virgin materials and demonstrates how waste can become a valuable resource.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Environmental Impact */}
                <div className="mb-16 bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
                    <h2 className="text-4xl font-bold mb-8 text-center">Environmental Impact</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-4 text-green-400">Why Bio-Plastic?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3 text-black">
                                    <div className="bg-green-400 rounded-full w-2 h-2 mt-2 shrink-0"></div>
                                    <p>Reduces dependency on fossil fuels and petroleum-based plastics</p>
                                </li>
                                <li className="flex items-start space-x-3 text-black">
                                    <div className="bg-green-400 rounded-full w-2 h-2 mt-2 shrink-0"></div>
                                    <p>Decomposes naturally without leaving microplastics</p>
                                </li>
                                <li className="flex items-start space-x-3 text-black">
                                    <div className="bg-green-400 rounded-full w-2 h-2 mt-2 shrink-0"></div>
                                    <p>Lower carbon footprint during production</p>
                                </li>
                                <li className="flex items-start space-x-3 text-black">
                                    <div className="bg-green-400 rounded-full w-2 h-2 mt-2 shrink-0"></div>
                                    <p>Diverts organic waste from landfills</p>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-4 text-green-400">Our Commitment</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3 text-black">
                                    <div className="bg-green-400 rounded-full w-2 h-2 mt-2 shrink-0"></div>
                                    <p>100% transparency in our manufacturing process</p>
                                </li>
                                <li className="flex items-start space-x-3 text-black">
                                    <div className="bg-green-400 rounded-full w-2 h-2 mt-2 shrink-0"></div>
                                    <p>Zero harmful chemical additives</p>
                                </li>
                                <li className="flex items-start space-x-3 text-black">
                                    <div className="bg-green-400 rounded-full w-2 h-2 mt-2 shrink-0"></div>
                                    <p>Certified biodegradable and compostable products</p>
                                </li>
                                <li className="flex items-start space-x-3 text-black">
                                    <div className="bg-green-400 rounded-full w-2 h-2 mt-2 shrink-0"></div>
                                    <p>Continuous innovation in sustainable materials</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                    <h2 className="text-4xl font-bold text-green-700 mb-6">Join the Movement</h2>
                    <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                        Every purchase, every donation, and every choice you make contributes to a cleaner, healthier planet. Together, we can create a sustainable future for generations to come.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/home" className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg">
                            Shop Now
                        </Link>
                        <Link href="/contribute" className="bg-transparent border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transform hover:scale-105 transition-all">
                            Donate Bio-Waste
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}