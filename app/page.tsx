import Image from "next/image";
import PlacementCourseCard from "./components/PlacementCourseCard";



export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full px-4 py-4 sm:py-3 pl-12 pr-20 sm:pr-16 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-base sm:text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-4 sm:pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button className="absolute inset-y-0 right-0 px-4 sm:px-4 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors duration-200 font-medium text-sm sm:text-sm min-w-[80px] sm:min-w-0">
                  Search
                </button>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-orange-500">DataInYourself</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            India's number one computer training platform. Learn from industry experts and advance your career with our comprehensive courses.
          </p>
        </div>
      </section>

      {/* Placement Courses Section */}
      <section className="py-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Placement Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <PlacementCourseCard
              iconSrc="/file.svg"
              iconAlt="Data Analyst"
              title="Data Analyst"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="3-4 months"
            />
            <PlacementCourseCard
              iconSrc="/globe.svg"
              iconAlt="Business Analyst"
              title="Business Analyst"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="3-4 months"
            />
            <PlacementCourseCard
              iconSrc="/window.svg"
              iconAlt="Data Science"
              title="Data Science"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="4-5 months"
            />
            <PlacementCourseCard
              iconSrc="/next.svg"
              iconAlt="SQL Analyst"
              title="SQL Analyst"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="1 month"
            />
            <PlacementCourseCard
              iconSrc="/vercel.svg"
              iconAlt="Machine Learning"
              title="Machine Learning"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="1 month"
            />
            <PlacementCourseCard
              iconSrc="/file.svg"
              iconAlt="Python for Beginners"
              title="Python for Beginners"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="1 month"
            />
            <PlacementCourseCard
              iconSrc="/globe.svg"
              iconAlt="Power BI / Tableau Mastery"
              title="Power BI / Tableau Mastery"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="1 month"
            />
            <PlacementCourseCard
              iconSrc="/window.svg"
              iconAlt="Digital Marketing"
              title="Digital Marketing"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="2-3 months"
            />
            <PlacementCourseCard
              iconSrc="/next.svg"
              iconAlt="Placement Ready"
              title="Placement Ready"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="1 month"
            />
            <PlacementCourseCard
              iconSrc="/vercel.svg"
              iconAlt="Web Developer"
              title="Web Developer"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="3 months"
            />
            <PlacementCourseCard
              iconSrc="/file.svg"
              iconAlt="Cyber Security"
              title="Cyber Security"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="3 months"
            />
            <PlacementCourseCard
              iconSrc="/globe.svg"
              iconAlt="Cloud Engineer"
              title="Cloud Engineer"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="2 months"
            />
            <PlacementCourseCard
              iconSrc="/window.svg"
              iconAlt="Prompt Engineer"
              title="Prompt Engineer"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="3 months"
            />
            <PlacementCourseCard
              iconSrc="/next.svg"
              iconAlt="Product Management"
              title="Product Management"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="3 months"
            />
            <PlacementCourseCard
              iconSrc="/vercel.svg"
              iconAlt="Finance Analyst"
              title="Finance Analyst"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="3 months"
            />
            <PlacementCourseCard
              iconSrc="/file.svg"
              iconAlt="AutoCAD AutoDesk"
              title="AutoCAD AutoDesk"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="1-2 months"
            />
            <PlacementCourseCard
              iconSrc="/globe.svg"
              iconAlt="Autodesk Revit"
              title="Autodesk Revit"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="1-2 months"
            />
            <PlacementCourseCard
              iconSrc="/window.svg"
              iconAlt="STAAD Pro"
              title="STAAD Pro"
              price="₹ 57,820.00"
              batch="Coming Soon"
              duration="1-2 months"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose DataInYourself?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of experience.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Certified Courses</h3>
              <p className="text-gray-600">Get industry-recognized certificates upon completion.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">Learn at your own pace with 24/7 access to courses.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
