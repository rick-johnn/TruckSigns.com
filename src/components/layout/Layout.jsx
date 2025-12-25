import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, fullWidth = false, noFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4 sm:px-6 lg:px-8'}`}>
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
