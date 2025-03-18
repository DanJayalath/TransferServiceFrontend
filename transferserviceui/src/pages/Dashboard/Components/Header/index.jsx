export default function Header({ isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div>{/* Add user profile or other header content here */}</div>
    </header>
  );
}