import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { BrowserRouter } from "react-router";
import AppHeader from "@/Components/Layout/AppHeader";
import Backdrop from "@/Components/Layout/Backdrop";
import AppSidebar from "@/Components/Layout/AppSidebar";
import { ThemeProvider } from "@/context/ThemeContext";

interface AuthenticatedProps {
  children: React.ReactNode;
}


const LayoutContent: React.FC<AuthenticatedProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <ThemeProvider>
        <BrowserRouter>
          <LayoutContent>
            {children}
          </LayoutContent>
        </BrowserRouter>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default Authenticated;
