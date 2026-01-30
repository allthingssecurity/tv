'use client';

import { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import ChannelCard from '@/components/ChannelCard';
import { channels, regions } from '@/data/channels';
import { Category, categoryLabels } from '@/types';
import { Search, Filter, Grid, List, X } from 'lucide-react';

type ViewMode = 'grid' | 'list';

export default function ChannelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'country'>('name');

  const countries = useMemo(() => {
    const uniqueCountries = [...new Set(channels.map((c) => c.country))];
    return uniqueCountries.sort();
  }, []);

  const filteredChannels = useMemo(() => {
    let filtered = [...channels];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.country.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }

    // Country filter
    if (selectedCountry !== 'all') {
      filtered = filtered.filter((c) => c.country === selectedCountry);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.country.localeCompare(b.country);
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedCountry, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCountry('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedCountry !== 'all';

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Channels</h1>
          <p className="text-foreground-secondary">
            Browse {channels.length}+ live TV channels from around the world
          </p>
        </div>

        {/* Filters */}
        <div className="bg-background-secondary rounded-xl border border-border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary"
              />
              <input
                type="text"
                placeholder="Search channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background-tertiary border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
                className="w-full lg:w-44 px-4 py-2.5 bg-background-tertiary border border-border rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-accent"
              >
                <option value="all">All Categories</option>
                {(Object.keys(categoryLabels) as Category[]).map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryLabels[cat]}
                  </option>
                ))}
              </select>
              <Filter
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary pointer-events-none"
              />
            </div>

            {/* Country Filter */}
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full lg:w-44 px-4 py-2.5 bg-background-tertiary border border-border rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-accent"
              >
                <option value="all">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <Filter
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary pointer-events-none"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'country')}
              className="w-full lg:w-36 px-4 py-2.5 bg-background-tertiary border border-border rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-accent"
            >
              <option value="name">Sort by Name</option>
              <option value="country">Sort by Country</option>
            </select>

            {/* View Toggle */}
            <div className="flex border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${
                  viewMode === 'grid'
                    ? 'bg-accent text-white'
                    : 'bg-background-tertiary hover:bg-border'
                } transition-colors`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${
                  viewMode === 'list'
                    ? 'bg-accent text-white'
                    : 'bg-background-tertiary hover:bg-border'
                } transition-colors`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <span className="text-sm text-foreground-secondary">Active filters:</span>
              {searchQuery && (
                <span className="flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent rounded-full text-sm">
                  &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent rounded-full text-sm">
                  {categoryLabels[selectedCategory]}
                  <button onClick={() => setSelectedCategory('all')}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedCountry !== 'all' && (
                <span className="flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent rounded-full text-sm">
                  {selectedCountry}
                  <button onClick={() => setSelectedCountry('all')}>
                    <X size={14} />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-foreground-secondary hover:text-accent ml-auto"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-foreground-secondary mb-4">
          Showing {filteredChannels.length} of {channels.length} channels
        </p>

        {/* Channels Grid/List */}
        {filteredChannels.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredChannels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredChannels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} variant="compact" />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <p className="text-xl font-semibold mb-2">No channels found</p>
            <p className="text-foreground-secondary mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-lg transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
