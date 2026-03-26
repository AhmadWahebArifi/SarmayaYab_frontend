import React, { useState, useEffect } from 'react';
import { useLoader } from '../contexts/LoaderProvider';

const StockRequestForm = ({ onSubmit, initialData = {} }) => {
  const { showLoader, hideLoader } = useLoader();
  const [formData, setFormData] = useState({
    priority: 'normal',
    expected_delivery_date: '',
    reason: '',
    cost_center: '',
    note: '',
    items: []
  });
  
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [autoReorderSuggestions, setAutoReorderSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchSuggestions();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setProducts(data.data || data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSuggestions = async () => {
    try {
      showLoader('Loading smart suggestions...', false);
      
      const [suggestionsRes, reorderRes] = await Promise.all([
        fetch('/api/analytics/product-suggestions', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/analytics/auto-reorder-suggestions', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      const suggestionsData = await suggestionsRes.json();
      const reorderData = await reorderRes.json();

      setSuggestions(suggestionsData);
      setAutoReorderSuggestions(reorderData);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      hideLoader();
    }
  };

  const addItem = (product) => {
    const newItem = {
      product_id: product.id,
      name: product.name,
      sku: product.sku,
      requested_qty: product.suggested_quantity || 1,
      selling_price: product.selling_price
    };
    
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItemQuantity = (index, quantity) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, requested_qty: parseInt(quantity) || 0 } : item
      )
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => 
      total + (item.requested_qty * item.selling_price), 0
    ).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.items.length === 0) {
      alert('Please add at least one product to the request');
      return;
    }

    try {
      showLoader('Creating stock request...', true);
      
      const requestData = {
        ...formData,
        items: formData.items.map(({ product_id, requested_qty }) => ({
          product_id,
          requested_qty
        }))
      };

      const response = await fetch('/api/stock-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const result = await response.json();
        onSubmit && onSubmit(result);
      } else {
        throw new Error('Failed to create stock request');
      }
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to create stock request. Please try again.');
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface-container-lowest rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-on-surface mb-2">Create Stock Request</h2>
        <p className="text-on-surface-variant">Request products from warehouse inventory</p>
      </div>

      {/* Smart Suggestions */}
      {(suggestions.frequently_requested?.length > 0 || autoReorderSuggestions.length > 0) && (
        <div className="mb-8 p-4 bg-primary-container/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              Smart Suggestions
            </h3>
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="text-sm text-primary hover:underline"
            >
              {showSuggestions ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showSuggestions && (
            <div className="space-y-4">
              {autoReorderSuggestions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-on-surface-variant mb-2">Low Stock - Auto Reorder</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {autoReorderSuggestions.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-2 bg-surface-container rounded">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-on-surface-variant">
                            Current: {product.current_stock} | Suggested: {product.suggested_quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => addItem(product)}
                          className="px-3 py-1 bg-primary text-on-primary text-sm rounded hover:opacity-90"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.frequently_requested?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-on-surface-variant mb-2">Frequently Requested</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestions.frequently_requested.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-2 bg-surface-container rounded">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-on-surface-variant">
                            Requested {product.request_count} times
                          </p>
                        </div>
                        <button
                          onClick={() => addItem(product)}
                          className="px-3 py-1 bg-secondary text-on-secondary text-sm rounded hover:opacity-90"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Request Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container text-on-surface"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">Expected Delivery Date</label>
            <input
              type="date"
              value={formData.expected_delivery_date}
              onChange={(e) => setFormData(prev => ({ ...prev, expected_delivery_date: e.target.value }))}
              className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container text-on-surface"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">Reason</label>
            <input
              type="text"
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              placeholder="e.g., Customer order, Stock replenishment"
              className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container text-on-surface"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">Cost Center</label>
            <input
              type="text"
              value={formData.cost_center}
              onChange={(e) => setFormData(prev => ({ ...prev, cost_center: e.target.value }))}
              placeholder="e.g., CC-001, Marketing"
              className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container text-on-surface"
            />
          </div>
        </div>

        {/* Product Search */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">Add Products</label>
          <select
            onChange={(e) => {
              const product = products.find(p => p.id == e.target.value);
              if (product) {
                addItem(product);
                e.target.value = '';
              }
            }}
            className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container text-on-surface"
          >
            <option value="">Select a product to add...</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.sku}) - ${product.selling_price}
              </option>
            ))}
          </select>
        </div>

        {/* Requested Items */}
        {formData.items.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-on-surface mb-4">Requested Items</h3>
            <div className="space-y-2">
              {formData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-surface-container rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-on-surface">{item.name}</p>
                    <p className="text-sm text-on-surface-variant">{item.sku}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-on-surface-variant">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.requested_qty}
                      onChange={(e) => updateItemQuantity(index, e.target.value)}
                      className="w-20 p-2 border border-outline-variant rounded bg-surface-container-high text-on-surface"
                    />
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-on-surface">
                      ${(item.requested_qty * item.selling_price).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-error hover:bg-error-container rounded"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-outline-variant">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-on-surface">Total Value:</span>
                <span className="text-lg font-bold text-primary">${calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">Additional Notes</label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
            rows={3}
            placeholder="Any additional information or special requirements..."
            className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container text-on-surface"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setFormData({ priority: 'normal', expected_delivery_date: '', reason: '', cost_center: '', note: '', items: [] })}
            className="px-6 py-3 border border-outline-variant text-on-surface rounded-lg hover:bg-surface-container"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-on-primary rounded-lg hover:opacity-90 font-medium"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockRequestForm;
