import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Footer from "@/components/shared/Footer";
import Admin from "@/pages/Admin";
import LandingPage from "@/pages/LandingPage";

// Simple header for admin page only
import { Link } from "wouter";

const AdminHeader = () => {
  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold font-['Montserrat'] tracking-tight cursor-pointer">
            <span className="text-[#D4AF37]">BANADIR</span> AUTO BODY
          </span>
        </Link>
        <Link href="/">
          <span className="text-white hover:text-[#D4AF37] cursor-pointer">
            Back to Main Site
          </span>
        </Link>
      </div>
    </header>
  );
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        {/* Custom routing for header */}
        <Route path="/admin">
          <AdminHeader />
        </Route>
        
        <main className="flex-grow">
          <Router />
        </main>
        
        {/* Footer on main page only, not on admin */}
        <Route path="/">
          <Footer />
        </Route>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
