import { ExternalLink, Link, Search } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Explore Creators</h1>

      {/* 🔍 Search Input */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="search"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
      </div>

      {/* 👤 Creator Card */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src="/spacedog.jpg"
                alt="Space Ranger"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold">Space Ranger</span>
            </div>
            <Link href="/profile">
              <button className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md">
                View Profile <ExternalLink className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold text-sm">About Space Ranger</h2>
            <p className="text-sm text-gray-700">
              All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible...
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-sm">Social Media URL</h3>
            <p className="text-sm text-blue-600 break-all">
              https://buymeacoffee.com/baconpancakes1
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
