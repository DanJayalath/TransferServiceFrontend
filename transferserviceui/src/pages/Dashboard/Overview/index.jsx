import StatsCard from "./StatsCard";
import MonthlyBookingsChart from "./MonthlyBookingsChart";
import BookingTrendsChart from "./BookingTrendsChart";
import CustomerDemographics from "./CustomerDemographics";
import RecentBookingsTable from "./RecentBookingsTable";

export default function Overview() {
  return (
    <main className="p-6 bg-gray-50 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customers Card */}
        <StatsCard
          title="Customers"
          value="3,782"
          percentage="+10.1%"
          icon={
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />
        {/* Bookings Card */}
        <StatsCard
          title="Bookings"
          value="5,359"
          percentage="-5.5%"
          icon={
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zm-6 0a2 2 0 11-4 0 2 2 0 014 0zm2-7l-5 5m0-5l5 5m-8-9h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h3"
              />
            </svg>
          }
        />
        {/* Revenue Card */}
        <StatsCard
          title="Revenue"
          value="$38,287"
          percentage="75.55% (Target)"
          icon={
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-9c-1.657 0-3 .895-3 2s1.343 2 3 2m0 0c1.11 0 2.08.402 2.599 1M13 16h4a2 2 0 002-2V8a2 2 0 00-2-2h-4m-4-1v8m0 0v8"
              />
            </svg>
          }
        />
      </div>

      <MonthlyBookingsChart />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingTrendsChart />
        <CustomerDemographics />
      </div>
      <RecentBookingsTable />
    </main>
  );
}