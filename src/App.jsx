import React, { useState, useEffect } from 'react';
import { Home, Search, Heart, MapPin, Bed, Bath, Square, Phone, Mail, MessageSquare, Menu, X, Filter, SortAsc, Star, Calendar, User, Bell, ArrowRight, ChevronDown, Eye, Share2 } from 'lucide-react';

const RealEstateApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [propertyType, setPropertyType] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [notifications, setNotifications] = useState(3);

  // Enhanced property data with more details
  const properties = [
    {
      id: 1,
      title: "Modern Luxury Apartment",
      location: "Downtown Manhattan, NY",
      price: 3200,
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      type: "Apartment",
      featured: true,
      rating: 4.8,
      reviews: 24,
      amenities: ["Gym", "Pool", "Parking", "Pet Friendly"],
      description: "Stunning modern apartment with city views and premium amenities.",
      availableFrom: "2024-07-01",
      petFriendly: true,
      furnished: true
    },
    {
      id: 2,
      title: "Cozy Family House",
      location: "Suburban Austin, TX",
      price: 2800,
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      type: "House",
      featured: false,
      rating: 4.6,
      reviews: 18,
      amenities: ["Garden", "Garage", "Fireplace"],
      description: "Perfect family home with spacious backyard and quiet neighborhood.",
      availableFrom: "2024-08-15",
      petFriendly: true,
      furnished: false
    },
    {
      id: 3,
      title: "Studio Loft",
      location: "Arts District, LA",
      price: 1900,
      beds: 1,
      baths: 1,
      sqft: 600,
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      type: "Studio",
      featured: true,
      rating: 4.7,
      reviews: 31,
      amenities: ["High Ceilings", "Exposed Brick", "Rooftop Access"],
      description: "Artistic loft in the heart of LA's creative district.",
      availableFrom: "2024-06-30",
      petFriendly: false,
      furnished: true
    },
    {
      id: 4,
      title: "Waterfront Condo",
      location: "Miami Beach, FL",
      price: 4500,
      beds: 2,
      baths: 2,
      sqft: 1400,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      type: "Condo",
      featured: true,
      rating: 4.9,
      reviews: 42,
      amenities: ["Ocean View", "Balcony", "Pool", "Concierge"],
      description: "Luxury beachfront living with stunning ocean views.",
      availableFrom: "2024-07-15",
      petFriendly: false,
      furnished: true
    },
    {
      id: 5,
      title: "Urban Townhouse",
      location: "Brooklyn Heights, NY",
      price: 3800,
      beds: 3,
      baths: 3,
      sqft: 2000,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      type: "Townhouse",
      featured: false,
      rating: 4.5,
      reviews: 15,
      amenities: ["Private Entrance", "Terrace", "Storage"],
      description: "Historic townhouse with modern updates and private outdoor space.",
      availableFrom: "2024-09-01",
      petFriendly: true,
      furnished: false
    },
    {
      id: 6,
      title: "Garden Apartment",
      location: "Portland, OR",
      price: 2200,
      beds: 2,
      baths: 1,
      sqft: 950,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      type: "Apartment",
      featured: false,
      rating: 4.4,
      reviews: 22,
      amenities: ["Garden Access", "Laundry", "Bike Storage"],
      description: "Peaceful apartment with beautiful garden views and eco-friendly features.",
      availableFrom: "2024-08-01",
      petFriendly: true,
      furnished: false
    }
  ];

  const getFilteredAndSortedProperties = () => {
    let filtered = properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      const matchesType = propertyType === 'all' || property.type.toLowerCase() === propertyType.toLowerCase();
      
      return matchesSearch && matchesPrice && matchesType;
    });

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(a.availableFrom) - new Date(b.availableFrom);
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
      }
    });

    return filtered;
  };

  const filteredProperties = getFilteredAndSortedProperties();

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const PropertyCard = ({ property, isListView = false }) => (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group ${isListView ? 'flex' : ''}`}>
      <div className={`relative ${isListView ? 'w-1/3' : ''}`}>
        <img
          src={property.image}
          alt={property.title}
          className={`object-cover ${isListView ? 'w-full h-48' : 'w-full h-48'}`}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
          {property.furnished && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Furnished
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => toggleFavorite(property.id)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all transform hover:scale-110"
          >
            <Heart
              className={`w-5 h-5 ${
                favorites.has(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all transform hover:scale-110">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
          <span className="text-sm font-semibold">{property.rating}</span>
          <span className="text-xs text-gray-600 ml-1">({property.reviews})</span>
        </div>
      </div>
      
      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">${property.price}</span>
            <span className="text-gray-500 text-sm">/mo</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex justify-between items-center text-gray-700 mb-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.beds} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.baths} baths</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.sqft} sqft</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Available from {new Date(property.availableFrom).toLocaleDateString()}</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProperty(property)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </button>
          <button className="px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const FilterPanel = () => (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${filterOpen ? 'block' : 'hidden'} lg:block`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
      
      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="studio">Studio</option>
          <option value="townhouse">Townhouse</option>
        </select>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>$0</span>
          <span>$5000+</span>
        </div>
      </div>
      
      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="featured">Featured First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
      
      <button
        onClick={() => {
          setPropertyType('all');
          setPriceRange([0, 5000]);
          setSortBy('featured');
        }}
        className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );

  const PropertyModal = ({ property, onClose }) => {
    if (!property) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h2>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">${property.price}</div>
                <div className="text-gray-500">per month</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Bed className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold">{property.beds}</div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Bath className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold">{property.baths}</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Square className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold">{property.sqft}</div>
                <div className="text-sm text-gray-600">Sq Ft</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500 fill-current" />
                <div className="font-semibold">{property.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Schedule Tour
              </button>
              <button className="flex-1 border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Navbar = () => (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Home className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RentEase
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('properties')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'properties'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'contact'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Contact Us
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  currentPage === 'home'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('properties');
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  currentPage === 'properties'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  currentPage === 'contact'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div>
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
              Dream Home
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover amazing properties in prime locations with our advanced search and personalized recommendations
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row items-center bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex-1 flex items-center p-4">
                <Search className="w-6 h-6 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search by location, property type, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                />
              </div>
              <button 
                onClick={() => setCurrentPage('properties')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center"
              >
                Search Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">1000+</div>
              <div className="text-blue-100">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">50+</div>
              <div className="text-blue-100">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">4.8★</div>
              <div className="text-blue-100">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Properties */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Handpicked premium properties with exceptional ratings and amenities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.filter(p => p.featured).map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('properties')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 inline-flex items-center"
            >
              View All Properties
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose RentEase?</h2>
            <p className="text-xl text-blue-100">Experience the future of property rentals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Search</h3>
              <p className="text-blue-100">Advanced filters and AI-powered recommendations to find your perfect match</p>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Verified Properties</h3>
              <p className="text-blue-100">All properties are verified with authentic photos and accurate information</p>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
              <p className="text-blue-100">Round-the-clock customer support for all your rental needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PropertiesPage = () => (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Properties</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="lg:hidden flex items-center px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <div className="w-5 h-5 grid grid-cols-2 gap-1">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <div className="w-5 h-5 flex flex-col gap-1">
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                  </div>
                </button>
              </div>
              
              <div className="text-gray-600 bg-white px-4 py-3 rounded-xl border">
                {filteredProperties.length} properties found
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel />
          </div>
          
          {/* Properties Grid/List */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} isListView={true} />
                ))}
              </div>
            )}
            
            {filteredProperties.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all properties</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setPropertyType('all');
                    setPriceRange([0, 5000]);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Panel */}
      {filterOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Filters</h3>
              <button
                onClick={() => setFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  );

  const ContactPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: '',
      propertyInterest: ''
    });

    const handleSubmit = () => {
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', message: '', propertyInterest: '' });
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Our Team</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ready to find your dream home? Get in touch with our expert agents today</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Information */}
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-6">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Phone</h3>
                      <p className="text-blue-100 text-lg">+1 (555) 123-4567</p>
                      <p className="text-blue-200 text-sm">Available 24/7 for urgent inquiries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-6">
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Email</h3>
                      <p className="text-blue-100 text-lg">hello@rentease.com</p>
                      <p className="text-blue-200 text-sm">We typically respond within 2 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-6">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Visit Us</h3>
                      <p className="text-blue-100 text-lg">123 Real Estate Avenue<br />New York, NY 10001</p>
                      <p className="text-blue-200 text-sm">Open Monday-Saturday, 9AM-6PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <h3 className="font-bold text-xl mb-3">Quick Response Promise</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Our dedicated team is committed to responding to all inquiries within 2 hours during business hours. 
                    For urgent matters, don't hesitate to call us directly.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Property Interest
                  </label>
                  <select
                    name="propertyInterest"
                    value={formData.propertyInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="studio">Studio</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-50 focus:bg-white"
                    placeholder="Tell us about your requirements, budget, preferred location, or any questions you have..."
                    required
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg shadow-lg"
                >
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Send Message
                </button>
                
                <p className="text-sm text-gray-600 text-center">
                  By sending this message, you agree to our terms of service and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'properties' && <PropertiesPage />}
      {currentPage === 'contact' && <ContactPage />}
      
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
    </div>
  );
};

export default RealEstateApp;