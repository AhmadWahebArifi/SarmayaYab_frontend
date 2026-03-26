// Preload utilities for better performance
export const preloadComponent = (componentImport) => {
  const componentLoader = async () => {
    try {
      const component = await componentImport();
      return component;
    } catch (error) {
      console.error('Error preloading component:', error);
      return null;
    }
  };
  
  // Start preloading in background
  componentLoader();
};

// Preload critical components when user hovers over navigation items
export const preloadOnHover = (componentImport) => {
  let preloaded = false;
  
  return () => {
    if (!preloaded) {
      preloaded = true;
      preloadComponent(componentImport);
    }
  };
};

// Preload all components after initial load
export const preloadAllComponents = () => {
  setTimeout(() => {
    // Preload frequently accessed components
    preloadComponent(() => import('./components/StockRequestsList'));
    preloadComponent(() => import('./components/InventoryDashboard'));
    
    // Preload admin/warehouse components if user has appropriate role
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role === 'admin' || user?.role === 'warehouse_staff') {
      preloadComponent(() => import('./components/ProductCatalog'));
      preloadComponent(() => import('./components/BranchManagement'));
    }
  }, 2000); // Start preloading after 2 seconds
};

export default preloadComponent;
